import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { uploadImageToCloudinary } from "./cloudinaryService";

const COLLECTION = "website_images";

// Every known image slot for the site, section by section. A slot existing
// here does NOT mean it has an uploaded image yet — Firestore only holds a
// document for slots that actually have (or once had) a real Cloudinary
// asset. A slot present here but absent from Firestore, or present but
// inactive (removed), is simply "empty" and callers should render an
// intentional fallback, never an <img src="">.
//
// Deliberately NOT included here: the repeating "post grid" sections (Home
// featured posts, Weddings/Couples galleries, Elopement Guides list). Those
// render fictional sample content (placeholder names/titles) representing a
// future dynamic Gallery/Portfolio management feature — a collection of
// arbitrary posts, not a fixed set of named slots — so folding them into
// this single-image-per-slot model would mean inventing slots that don't
// really describe fixed UI positions. They're intentionally out of scope
// here; see the Phase 2 Step 2 report for the full classification.
export const WEBSITE_IMAGE_SLOTS = [
  // About — migrated in Phase 2 Step 1
  { section: "about", position: "topImage", label: "Top Hero Image" },
  { section: "about", position: "aboutImage", label: "Portrait Image" },
  { section: "about", position: "bottomBg", label: "Bottom Parallax Background" },
  { section: "about", position: "overlay", label: "Full-Width Overlay Image" },
  { section: "about", position: "gallery1", label: "Photo Grid — Image 1" },
  { section: "about", position: "gallery2", label: "Photo Grid — Image 2" },
  { section: "about", position: "gallery3", label: "Photo Grid — Image 3" },
  { section: "about", position: "gallery4", label: "Photo Grid — Image 4" },
  { section: "about", position: "gallery5", label: "Photo Grid — Image 5" },
  { section: "about", position: "gallery6", label: "Photo Grid — Image 6" },
  { section: "about", position: "gallery7", label: "Photo Grid — Image 7" },

  // Home
  { section: "home", position: "hero", label: "Hero Background" },
  { section: "home", position: "collage1", label: "Hero Collage — Image 1" },
  { section: "home", position: "collage2", label: "Hero Collage — Image 2" },
  { section: "home", position: "collage3", label: "Hero Collage — Image 3" },
  { section: "home", position: "heyImage", label: "\"Hey You\" Intro Photo" },
  { section: "home", position: "cameraImage", label: "\"Girl Behind The Camera\" Photo" },
  { section: "home", position: "guidesBanner", label: "Wedding Guides Banner Background" },

  // Other pages — hero image only for this step; each page's repeating
  // post grid is out of scope (see note above)
  { section: "weddings", position: "hero", label: "Weddings Hero" },
  { section: "couples", position: "hero", label: "Couples Hero" },
  { section: "pricing", position: "hero", label: "Pricing Hero" },
  { section: "guides", position: "hero", label: "Elopement Guides Hero" },
  { section: "contact", position: "hero", label: "Contact Hero" },
];

const DEFAULT_FOCAL_POINT = { x: 0.5, y: 0.5 };

function slotDocId(section, position) {
  return `${section}_${position}`;
}

// Docs written before the isActive field existed (Phase 2 Step 1) are
// treated as active — the field's absence means "never removed", not
// "removed".
function isImageActive(data) {
  return data.isActive !== false;
}

export async function getWebsiteImage(section, position) {
  const snap = await getDoc(doc(db, COLLECTION, slotDocId(section, position)));
  if (!snap.exists()) return null;
  const data = snap.data();
  if (!isImageActive(data)) return null;
  return { id: snap.id, ...data };
}

// Returns a { [position]: imageDoc } map for every ACTIVE image that
// exists in Firestore for this section. Positions with no uploaded image,
// or whose image was removed, are simply absent from the returned map —
// callers don't need to check isActive themselves.
export async function getWebsiteImagesBySection(section) {
  const q = query(collection(db, COLLECTION), where("section", "==", section));
  const snapshot = await getDocs(q);

  const map = {};
  snapshot.docs.forEach((docSnap) => {
    const data = docSnap.data();
    if (!isImageActive(data)) return;
    map[data.position] = { id: docSnap.id, ...data };
  });
  return map;
}

// Inserts a Cloudinary delivery transformation (resize/crop/format/quality)
// into an existing Cloudinary URL. Works on any res.cloudinary.com URL of
// the form `.../upload/<version>/<public_id>.<ext>` — safe no-op on
// anything else (missing URL, non-Cloudinary URL).
export function buildResponsiveImageUrl(url, { width, height, crop = "fill", gravity = "auto" } = {}) {
  if (!url || !url.includes("/upload/")) return url;

  const [prefix, suffix] = url.split("/upload/");
  const transforms = ["f_auto", "q_auto"];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (width || height) transforms.push(`c_${crop}`, `g_${gravity}`);

  return `${prefix}/upload/${transforms.join(",")}/${suffix}`;
}

// Builds a srcSet string for responsive <img> delivery, so a phone never
// downloads the same multi-thousand-pixel original a desktop does.
export function buildSrcSet(url, widths = [480, 768, 1200, 1920]) {
  if (!url) return "";
  return widths
    .map((w) => `${buildResponsiveImageUrl(url, { width: w })} ${w}w`)
    .join(", ");
}

export { isCloudinaryUploadConfigured } from "./cloudinaryService";

// Upload succeeds -> THEN Firestore is written. If the upload fails, no
// Firestore write happens at all and the old reference stays active. If
// the upload succeeds but the Firestore write fails, the error propagates
// to the caller and the old Firestore reference is still untouched (the
// new Cloudinary asset is simply orphaned, not referenced by anything —
// consistent with "don't delete/cleanup old assets automatically" applied
// to this case too).
export async function replaceWebsiteImage(section, position, file, { altText } = {}) {
  const uploaded = await uploadImageToCloudinary(file);

  await setDoc(
    doc(db, COLLECTION, slotDocId(section, position)),
    {
      section,
      position,
      publicId: uploaded.publicId,
      imageUrl: uploaded.imageUrl,
      width: uploaded.width,
      height: uploaded.height,
      focalPoint: DEFAULT_FOCAL_POINT,
      altText: altText || "",
      isActive: true,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  return uploaded;
}

// Safe removal: only disables the Firestore reference (imageUrl/publicId
// set to null, isActive: false). The Cloudinary asset itself is left
// completely alone — this is intentionally not reversible-by-code (no undo
// button yet), but it IS recoverable, since the asset still exists in
// Cloudinary and a new replace can be pointed at it manually if needed.
export async function removeWebsiteImage(section, position) {
  await updateDoc(doc(db, COLLECTION, slotDocId(section, position)), {
    imageUrl: null,
    publicId: null,
    isActive: false,
    updatedAt: serverTimestamp(),
  });
}
