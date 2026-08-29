import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { uploadImageToCloudinary } from "./cloudinaryService";

const COLLECTION = "posts";

// Unlike website_images (fixed named slots), posts are genuine list items —
// there's no "slot identity" to preserve, so deleting one for real (not a
// soft isActive:false) is the correct model here. The Cloudinary asset is
// still never touched, matching the rest of the media system.
export const POST_SECTIONS = [
  { value: "home_featured", label: "Home — Featured Posts" },
  { value: "weddings", label: "Weddings" },
  { value: "couples", label: "Couples" },
  { value: "guides", label: "Elopement Guides" },
];

export async function getPostsBySection(section) {
  const q = query(collection(db, COLLECTION), where("section", "==", section));
  const snapshot = await getDocs(q);

  const posts = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
  posts.sort((a, b) => {
    const aMillis = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
    const bMillis = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
    return bMillis - aMillis; // newest first
  });
  return posts;
}

export async function createPost(section, { title, category, location, file }) {
  const uploaded = await uploadImageToCloudinary(file);

  await addDoc(collection(db, COLLECTION), {
    section,
    title: title.trim(),
    category: (category || "").trim(),
    location: (location || "").trim(),
    publicId: uploaded.publicId,
    imageUrl: uploaded.imageUrl,
    width: uploaded.width,
    height: uploaded.height,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

// If `file` is provided, a new image is uploaded to Cloudinary FIRST; the
// Firestore update (including the new image fields) only happens after
// that upload succeeds, and the old Firestore reference stays untouched if
// it fails — same reliability model as replaceWebsiteImage.
export async function updatePost(postId, { title, category, location, file }) {
  const updates = {
    title: title.trim(),
    category: (category || "").trim(),
    location: (location || "").trim(),
    updatedAt: serverTimestamp(),
  };

  if (file) {
    const uploaded = await uploadImageToCloudinary(file);
    updates.publicId = uploaded.publicId;
    updates.imageUrl = uploaded.imageUrl;
    updates.width = uploaded.width;
    updates.height = uploaded.height;
  }

  await updateDoc(doc(db, COLLECTION, postId), updates);
}

export async function deletePost(postId) {
  await deleteDoc(doc(db, COLLECTION, postId));
}
