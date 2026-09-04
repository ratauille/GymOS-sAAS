import { initializeApp, getApps, getApp } from 'firebase/app'
import { getDataConnect } from 'firebase/data-connect'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAnkNGipTl1bH4sHvvJkVIHzDS4RGW60AU",
  authDomain: "gymos-saas.firebaseapp.com",
  projectId: "gymos-saas",
  storageBucket: "gymos-saas.firebasestorage.app",
  messagingSenderId: "176518675928",
  appId: "1:176518675928:web:5a33865adea38dee98c6ad"
}

// Singleton Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// Firebase Data Connect Service Instance (PostgreSQL + GraphQL Connector)
export const dataConnect = getDataConnect(app, {
  connector: 'connector',
  location: 'us-central1',
  service: 'gymos-saas-service'
})
