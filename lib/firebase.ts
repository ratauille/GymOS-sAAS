import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAnkNGipTl1bH4sHvvJkVIHzDS4RGW60AU",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "gymos-saas.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "gymos-saas",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "gymos-saas.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "176518675928",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:176518675928:web:77a3267f27b7059998c6ad"
};

// Singleton Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

/**
 * Synchronize user profile state safely with Cloud Firestore
 */
export async function syncUserToFirestore(user: any) {
  try {
    const userEmail = user.email || "guest@gymos.com";
    const userRef = doc(db, "users", userEmail);
    await setDoc(userRef, {
      ...user,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (e) {
    console.warn("Firestore sync user skipped/failed:", e);
  }
}

/**
 * Synchronize check-in item safely with Cloud Firestore
 */
export async function syncCheckinToFirestore(checkin: any) {
  try {
    const checkinRef = doc(db, "checkins", checkin.id);
    await setDoc(checkinRef, {
      ...checkin,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (e) {
    console.warn("Firestore sync check-in skipped/failed:", e);
  }
}

/**
 * Save lead capture data safely to Cloud Firestore
 */
export async function syncLeadToFirestore(lead: { name: string; email: string }) {
  try {
    await addDoc(collection(db, "leads"), {
      ...lead,
      createdAt: new Date().toISOString()
    });
  } catch (e) {
    console.warn("Firestore sync lead skipped/failed:", e);
  }
}
