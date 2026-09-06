import { initializeApp, getApps } from "firebase/app";
import { getDataConnect, mutationRef, queryRef, executeMutation, executeQuery } from "firebase/data-connect";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAnkNGipTl1bH4sHvvJkVIHzDS4RGW60AU",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "gymos-saas.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "gymos-saas",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "gymos-saas.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "176518675928",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:176518675928:web:77a3267f27b7059998c6ad"
};

const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);

export const dataConnect = getDataConnect(app, {
  service: "gymos-saas-service",
  location: "us-central1",
  connector: "default"
});

export interface LeadInput {
  fullName: string;
  email: string;
  phone?: string;
  goal?: string;
  planInterest?: string;
}

export async function createLeadDataConnect(lead: LeadInput) {
  try {
    const ref = mutationRef(dataConnect, "CreateLead", lead as any);
    return await executeMutation(ref);
  } catch (err) {
    console.warn("DataConnect CreateLead warning:", err);
    return { data: null };
  }
}

export async function getClassesDataConnect() {
  try {
    const ref = queryRef(dataConnect, "ListClasses");
    const result = await executeQuery(ref);
    return (result.data as any)?.classes || [];
  } catch (err) {
    console.warn("DataConnect ListClasses warning:", err);
    return [];
  }
}
