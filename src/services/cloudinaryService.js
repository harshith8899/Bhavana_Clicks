// Thin wrapper around Cloudinary's unsigned upload API. This is the only
// file in the project that talks to Cloudinary directly — mediaService.js
// owns Firestore, this owns Cloudinary, and nothing else should call
// api.cloudinary.com directly.
//
// Unsigned uploads (not signed) are used deliberately: signed uploads need
// a secret generated server-side, which this project has no backend for
// (Cloud Functions would require the paid Blaze plan). The upload preset
// referenced below must be configured in the Cloudinary console with
// Signing Mode = Unsigned.

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export function isCloudinaryUploadConfigured() {
  return Boolean(CLOUD_NAME && UPLOAD_PRESET);
}

export async function uploadImageToCloudinary(file) {
  if (!isCloudinaryUploadConfigured()) {
    throw new Error("Cloudinary upload is not configured yet.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Cloudinary upload failed.");
  }

  const data = await response.json();
  return {
    publicId: data.public_id,
    imageUrl: data.secure_url,
    width: data.width,
    height: data.height,
  };
}
