import {
  addDoc,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export const ENQUIRY_STATUSES = ["new", "contacted", "confirmed", "archived"];

export async function saveEnquiry(data) {

    await addDoc(
        collection(db, "enquiries"),
        {
            ...data,
            status: "new",
            createdAt: serverTimestamp()
        }
    );

}

// Fetched without an orderBy clause on purpose: Firestore silently excludes
// documents missing the ordered field from the results, and some older
// enquiry documents in this project are missing fields (or, in a couple of
// cases, are missing everything except a status). Sorting client-side lets
// every document still be displayed, with a fallback for anything absent.
export async function getEnquiries() {
    const snapshot = await getDocs(collection(db, "enquiries"));

    const enquiries = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            name: data.name || "(No name)",
            email: data.email || "",
            phone: data.phone || "",
            date: data.date || "",
            event: data.event || "",
            package: data.package || "",
            message: data.message || "",
            status: data.status || "new",
            createdAt: data.createdAt ?? null,
        };
    });

    enquiries.sort((a, b) => {
        const aMillis = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const bMillis = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return bMillis - aMillis;
    });

    return enquiries;
}

// Updates only the `status` field of an enquiry, preserving every other
// field. Firestore rules independently enforce this same restriction
// server-side (an admin-only update limited to the `status` key, with the
// value checked against the same four statuses) — this client-side check
// just avoids a doomed round trip for an obviously invalid value.
export async function updateEnquiryStatus(enquiryId, status) {
    if (!ENQUIRY_STATUSES.includes(status)) {
        throw new Error(`Invalid enquiry status: "${status}"`);
    }

    await updateDoc(doc(db, "enquiries", enquiryId), { status });
}