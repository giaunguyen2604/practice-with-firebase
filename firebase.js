import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { EmailAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCg8HcLim1rJJVEKbp-gR-4E9TIbM8-2wU",
  authDomain: "ticket-event-69dd2.firebaseapp.com",
  projectId: "ticket-event-69dd2",
  storageBucket: "ticket-event-69dd2.appspot.com",
  messagingSenderId: "368042290287",
  appId: "1:368042290287:web:c726e768e6c862b7d2f19a",
  measurementId: "G-0LYQ8YDXE9"
};

// 👇🏻 Initializing Firebase in Next.js
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
//👇🏻 Initializing the Email/Password Auth
const provider = new EmailAuthProvider();
//👇🏻 Firebase File Storage
const storage = getStorage(app);
//👇🏻 Firebase Data Storage
const db = getFirestore(app);
//👇🏻 Firebase Auth
const auth = getAuth(app);

export { provider, auth, storage };
export default db;