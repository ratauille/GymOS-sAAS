/**
 * GymOS Firebase Cloud Integration Module
 * Firebase App, Firestore Real-time Database, Auth & Analytics Engine
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnkNGipTl1bH4sHvvJkVIHzDS4RGW60AU",
  authDomain: "gymos-saas.firebaseapp.com",
  projectId: "gymos-saas",
  storageBucket: "gymos-saas.firebasestorage.app",
  messagingSenderId: "176518675928",
  appId: "1:176518675928:web:5a33865adea38dee98c6ad"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

console.log("GymOS Firebase Cloud Engine Initialized (Project: gymos-saas).");

// Export to Global Window Object for GymOS App Integration
window.GymOSFirebase = {
  app,
  db,
  auth,

  // Save Lead to Firestore
  async saveLead(leadData) {
    try {
      const docRef = await addDoc(collection(db, "leads"), {
        ...leadData,
        createdAt: new Date().toISOString()
      });
      console.log("Lead guardado en Firebase Firestore con ID:", docRef.id);
      return docRef.id;
    } catch (e) {
      console.warn("Error al guardar lead en Firebase:", e);
      return null;
    }
  },

  // Real-time listener for Leads
  listenLeads(callback) {
    try {
      const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
      return onSnapshot(q, (snapshot) => {
        const leads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(leads);
      });
    } catch (e) {
      console.warn("Error escuchando leads en Firebase:", e);
    }
  }
};
