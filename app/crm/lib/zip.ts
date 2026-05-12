// ============================================================
// Zip processing — server-side
// ============================================================
// The artist uploads a single .zip containing three subfolders:
//   fbx/
//   glb/
//   gltf/
//
// Flow:
//   1. The browser uploads the zip DIRECTLY to Cloudinary
//      (using a signed payload from /api/upload-signature).
//      This bypasses Vercel's 4.5 MB request-body limit.
//   2. The browser then POSTs the resulting Cloudinary URL to
//      /api/projects/:id/finalize-upload.
//   3. THIS module: fetches that zip back, finds the .glb,
//      .fbx, and .gltf inside, and uploads each piece as a
//      separate Cloudinary asset under
//        <client>/<project>/uploads/rev-N/{glb,fbx,gltf}/<file>
//      so QA can preview the .glb via a stable URL.
//
// We only surface the *primary* .glb because that's what QA
// reviews in the dashboard. Multi-file gltf scenes (with .bin
// + textures) live inside the archived zip; we don't unpack
// every sibling for the MVP.
// ============================================================

import AdmZip from 'adm-zip';
import { uploadBuffer, uploadFolder } from './cloudinary';

export type ProcessedUpload = {
  // The Cloudinary URL of the source zip. Comes from the caller
  // in the direct-upload flow (browser already pushed it), or
  // from a fresh upload when running the legacy FormData flow.
  zipUrl: string;
  glbUrl: string | null;
  fbxUrl: string | null;
  gltfUrl: string | null;
};

// ============================================================
// Core extractor — takes an in-memory zip buffer, finds the
// three model files, and uploads each to Cloudinary.
// ============================================================
async function extractAndUpload(
  zipBuffer: Buffer,
  clientSlug: string,
  projectSlug: string,
  revision: number
): Promise<Omit<ProcessedUpload, 'zipUrl'>> {
  // ----- 1. Parse zip -----
  let zip: AdmZip;
  try {
    zip = new AdmZip(zipBuffer);
  } catch (err) {
    throw new Error(`Could not read zip file: ${(err as Error).message}`);
  }

  const entries = zip.getEntries();
  if (entries.length === 0) {
    throw new Error('Zip file is empty.');
  }

  // ----- 2. Locate the three model files -----
  // Match anywhere inside the path so that both
  //   glb/Jupiter.glb         (zip with 3 top-level folders)
  //   models/glb/Jupiter.glb  (zip with a wrapping folder)
  // both work.
  const findInFolder = (folder: string, ext: string) => {
    const folderRe = new RegExp(`(^|/)${folder}/`, 'i');
    const extRe = new RegExp(`\\.${ext}$`, 'i');
    return entries.find(
      (e) =>
        !e.isDirectory &&
        folderRe.test(e.entryName) &&
        extRe.test(e.entryName)
    );
  };

  const glbEntry = findInFolder('glb', 'glb');
  const fbxEntry = findInFolder('fbx', 'fbx');
  const gltfEntry = findInFolder('gltf', 'gltf');

  if (!glbEntry) {
    // GLB is the only one we strictly require, because the QA
    // dashboard previews it. FBX/GLTF are nice-to-have.
    throw new Error(
      'No .glb file found inside a glb/ folder in the zip. ' +
        'Expected structure: glb/<model>.glb, fbx/<model>.fbx, gltf/<model>.gltf'
    );
  }

  // ----- 3. Upload each model in parallel -----
  const folder = uploadFolder(clientSlug, projectSlug, revision);

  const [glb, fbx, gltf] = await Promise.all([
    uploadBuffer(glbEntry.getData(), {
      folder: `${folder}/glb`,
      publicId: baseName(glbEntry.entryName),
      resourceType: 'raw',
    }),
    fbxEntry
      ? uploadBuffer(fbxEntry.getData(), {
          folder: `${folder}/fbx`,
          publicId: baseName(fbxEntry.entryName),
          resourceType: 'raw',
        })
      : Promise.resolve(null),
    gltfEntry
      ? uploadBuffer(gltfEntry.getData(), {
          folder: `${folder}/gltf`,
          publicId: baseName(gltfEntry.entryName),
          resourceType: 'raw',
        })
      : Promise.resolve(null),
  ]);

  return {
    glbUrl: glb.secure_url,
    fbxUrl: fbx?.secure_url ?? null,
    gltfUrl: gltf?.secure_url ?? null,
  };
}

// ============================================================
// processArtistZip
// Used by the LEGACY route /api/projects/:id/upload that accepts
// FormData. Kept for local-dev convenience where the 4.5 MB limit
// doesn't apply. Production should prefer the direct-upload flow.
// ============================================================
export async function processArtistZip(
  zipBuffer: Buffer,
  clientSlug: string,
  projectSlug: string,
  revision: number
): Promise<ProcessedUpload> {
  const folder = uploadFolder(clientSlug, projectSlug, revision);

  // Upload the source zip in parallel with the extraction.
  const [zipUpload, extracted] = await Promise.all([
    uploadBuffer(zipBuffer, {
      folder,
      publicId: 'source.zip',
      resourceType: 'raw',
    }),
    extractAndUpload(zipBuffer, clientSlug, projectSlug, revision),
  ]);

  return {
    zipUrl: zipUpload.secure_url,
    ...extracted,
  };
}

// ============================================================
// processArtistZipFromUrl
// Used by the DIRECT-UPLOAD route /api/projects/:id/finalize-upload.
// The browser has already pushed the zip to Cloudinary, so we
// fetch it back, extract pieces, and reuse the existing Cloudinary
// URL for the source zip (no redundant re-upload).
// ============================================================
export async function processArtistZipFromUrl(
  zipUrl: string,
  clientSlug: string,
  projectSlug: string,
  revision: number
): Promise<ProcessedUpload> {
  const res = await fetch(zipUrl);
  if (!res.ok) {
    throw new Error(`Could not fetch uploaded zip (HTTP ${res.status}).`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  const extracted = await extractAndUpload(
    buffer,
    clientSlug,
    projectSlug,
    revision
  );
  return { zipUrl, ...extracted };
}

// "glb/Jupiter.glb" → "Jupiter.glb"
// "models/glb/Jupiter Chair.glb" → "Jupiter_Chair.glb"
// Cloudinary public_ids should not contain spaces, so we
// normalise them.
function baseName(entryName: string): string {
  const tail = entryName.split('/').pop() || entryName;
  return tail.replace(/\s+/g, '_');
}
