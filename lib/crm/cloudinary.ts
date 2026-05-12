/**
 * lib/crm/cloudinary.ts
 * -----------------------------------------------------------------------
 * Cloudinary helpers for the CRM.
 *
 * Folder layout in Cloudinary:
 *   unntangle-crm/
 *     <client>/
 *       <project>/
 *         zips/<timestamp>.zip                 ← original zip backup
 *         glb/<filename>.glb                   ← extracted glb
 *         gltf/<files...>                      ← extracted gltf set
 *         fbx/<filename>.fbx                   ← extracted fbx
 *         feedback/round-<n>/<filename>.jpg    ← QA feedback images
 *
 * All uploads use resource_type:'raw' for non-image assets so Cloudinary
 * doesn't try to transcode glb/fbx files.
 * -----------------------------------------------------------------------
 */
import { v2 as cloudinary } from 'cloudinary';

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY    = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  console.warn(
    '[crm/cloudinary] Cloudinary env vars not fully set — uploads will fail.'
  );
}

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

export { cloudinary };

const ROOT = 'unntangle-crm';

export const cloudPath = {
  zip: (client: string, project: string) =>
    `${ROOT}/${client}/${project}/zips`,
  glb: (client: string, project: string) =>
    `${ROOT}/${client}/${project}/glb`,
  gltf: (client: string, project: string) =>
    `${ROOT}/${client}/${project}/gltf`,
  fbx: (client: string, project: string) =>
    `${ROOT}/${client}/${project}/fbx`,
  feedback: (client: string, project: string, round: number) =>
    `${ROOT}/${client}/${project}/feedback/round-${round}`,
};

/**
 * Upload a Buffer to Cloudinary. Returns the full upload result.
 * resource_type 'raw' is used for binary files Cloudinary doesn't
 * understand natively (glb, fbx, bin); 'image' for jpg/png; 'auto'
 * lets Cloudinary decide.
 */
export function uploadBuffer(
  buffer: Buffer,
  options: {
    folder: string;
    public_id?: string;
    resource_type?: 'image' | 'raw' | 'auto' | 'video';
    overwrite?: boolean;
  }
): Promise<{ secure_url: string; public_id: string; bytes: number }> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder,
        public_id: options.public_id,
        resource_type: options.resource_type ?? 'auto',
        overwrite: options.overwrite ?? true,
        use_filename: true,
        unique_filename: false,
      },
      (err, result) => {
        if (err || !result) return reject(err ?? new Error('upload failed'));
        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
          bytes: result.bytes,
        });
      }
    );
    stream.end(buffer);
  });
}

/** Pick the file extension classification used to route into folders. */
export function classifyFile(filename: string): 'glb' | 'gltf' | 'fbx' | 'image' | 'raw' {
  const lower = filename.toLowerCase();
  if (lower.endsWith('.glb')) return 'glb';
  if (lower.endsWith('.gltf') || lower.endsWith('.bin')) return 'gltf';
  if (lower.endsWith('.fbx')) return 'fbx';
  if (/\.(jpe?g|png|webp|gif)$/.test(lower)) return 'image';
  // textures inside gltf folder are usually images, but we'll let
  // the zip extractor route by parent folder, not by extension alone.
  return 'raw';
}
