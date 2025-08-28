import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "chennai-road-watch",
  appId: "1:984275029007:web:1b5cf9492b3693d4b5677a",
  storageBucket: "chennai-road-watch.firebasestorage.app",
  apiKey: "AIzaSyACIOor01ZCMXDcB4En7gpwsy_kHZzKESY",
  authDomain: "chennai-road-watch.firebaseapp.com",
  messagingSenderId: "984275029007"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
