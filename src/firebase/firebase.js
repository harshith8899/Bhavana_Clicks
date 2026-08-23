import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPsI212meHoxgUx8_miZQoJn4vZY8_iew",
  authDomain: "bhavanaclicks-13897.firebaseapp.com",
  projectId: "bhavanaclicks-13897",
  storageBucket: "bhavanaclicks-13897.firebasestorage.app",
  messagingSenderId: "254990252520",
  appId: "1:254990252520:web:d92756bdf4eea87a548c5d",
  measurementId: "G-LEJ174VZZQ"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);