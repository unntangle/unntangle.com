/**
 * lib/crm/zip.ts
 * -----------------------------------------------------------------------
 * Extract uploaded zip files in memory and push each entry to Cloudinary.
 *
 * Expected zip layout (per the brief — see screenshot):
 *   <root>/
 *     fbx/...
 *     glb/...
 *     gltf/...
 *
 * The zip may also have a single top-level wrapper folder (common when
 * someone zips a folder rather than its contents); we strip that.
 *
 * We use adm-zip because it's pure-JS, no native bindings, works on
 * Vercel serverless.
 * -----------------------------------------------------------------------
 */
import AdmZip from 'adm-zip';
import { uploadBuffer, cloudPath, classifyFile } from './cloudinary';

export interface ExtractResult {
  glbUrl:   string | null;   // primary GLB to show in QA viewer
  files:    Array<{ path: string; url: string; bytes: number; kind: string }>;
  warnings: string[];
}

/**
 * Strip a single common top-level folder from all entries. e.g. if every
 * entry starts with "jupiter-v2/", remove that prefix.
 */
function stripCommonPrefix(entries: AdmZip.IZipEntry[]): (path: string) => string {
  const tops = new Set<string>();
  for (const e of entries) {
    if (e.isDirectory) continue;
    const top = e.entryName.split(/[\\/]/)[0];
    tops.add(top);
  }
  if (tops.size === 1) {
    const only = [...tops][0];
    // Only strip if it doesn't match one of our known top folders.
    if (!['fbx', 'glb', 'gltf'].includes(only.toLowerCase())) {
      return (p) => p.replace(new RegExp(`^${only}[\\\\/]`), '');
    }
  }
  return (p) => p;
}

/** Route a file to the right Cloudinary folder based on its path inside the zip. */
function routeFolder(
  relativePath: string,
  clientSlug: string,
  projectSlug: string
): { folder: string; kind: 'glb' | 'gltf' | 'fbx' | 'other'; resourceType: 'raw' | 'image' | 'auto' } {
  const parts = relativePath.toLowerCase().split(/[\\/]/);
  const topFolder = parts[0];

  if (topFolder === 'glb') {
    return {
      folder: cloudPath.glb(clientSlug, projectSlug),
      kind: 'glb',
      resourceType: 'raw',
    };
  }
  if (topFolder === 'gltf') {
    // gltf folder may contain .gltf, .bin, and texture images
    const cls = classifyFile(relativePath);
    return {
      folder: cloudPath.gltf(clientSlug, projectSlug),
      kind: 'gltf',
      resourceType: cls === 'image' ? 'image' : 'raw',
    };
  }
  if (topFolder === 'fbx') {
    return {
      folder: cloudPath.fbx(clientSlug, projectSlug),
      kind: 'fbx',
      resourceType: 'raw',
    };
  }
  // Files outside the 3 expected folders — still upload, but bucket them
  // by file type.
  const cls = classifyFile(relativePath);
  return {
    folder: cloudPath.glb(clientSlug, projectSlug),  // fallback
    kind: 'other',
    resourceType: cls === 'image' ? 'image' : 'raw',
  };
}

/**
 * Extract a zip buffer and upload each non-directory entry to Cloudinary.
 * Returns the URL of the primary GLB file (the one QA will view) along
 * with metadata on every uploaded file.
 */
export async function extractAndUpload(
  zipBuffer: Buffer,
  clientSlug: string,
  projectSlug: string
): Promise<ExtractResult> {
  const zip = new AdmZip(zipBuffer);
  const entries = zip.getEntries();
  const stripFn = stripCommonPrefix(entries);

  const files: ExtractResult['files'] = [];
  const warnings: string[] = [];
  let glbUrl: string | null = null;

  // Filter to actual files, strip prefix, sort glb-first so the primary
  // glb is uploaded early and we can return its URL fast.
  const work = entries
    .filter((e) => !e.isDirectory)
    .map((e) => ({ entry: e, rel: stripFn(e.entryName) }))
    .filter((w) => w.rel && !w.rel.startsWith('__MACOSX'))
    .sort((a, b) => {
      const aGlb = a.rel.toLowerCase().endsWith('.glb') ? 0 : 1;
      const bGlb = b.rel.toLowerCase().endsWith('.glb') ? 0 : 1;
      return aGlb - bGlb;
    });

  if (work.length === 0) {
    warnings.push('Zip contained no files.');
    return { glbUrl: null, files, warnings };
  }

  // Upload sequentially. Parallel uploads to Cloudinary work but each
  // free-tier account is rate-limited; sequential is safer for now and
  // gives us better progress reporting later.
  for (const { entry, rel } of work) {
    const { folder, kind, resourceType } = routeFolder(rel, clientSlug, projectSlug);
    const buf = entry.getData();
    // Drop the top folder from the public_id so it's not duplicated.
    const baseName = rel.split(/[\\/]/).slice(1).join('/') || rel;
    const publicIdBase = baseName.replace(/\.[^.]+$/, '');   // strip ext
    const publicId = publicIdBase || rel.replace(/\.[^.]+$/, '');

    try {
      const up = await uploadBuffer(buf, {
        folder,
        public_id: publicId,
        resource_type: resourceType,
        overwrite: true,
      });
      files.push({ path: rel, url: up.secure_url, bytes: up.bytes, kind });
      if (kind === 'glb' && !glbUrl) glbUrl = up.secure_url;
    } catch (err) {
      warnings.push(`Failed to upload ${rel}: ${(err as Error).message}`);
    }
  }

  if (!glbUrl) {
    warnings.push('No .glb file found in the zip — QA preview will not work.');
  }

  return { glbUrl, files, warnings };
}
