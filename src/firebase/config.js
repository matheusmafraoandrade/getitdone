import { initializeApp } from "firebase/app";
import { initializeFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Firebase config aqui embaixo
const firebaseConfig = {
  apiKey: "AIzaSyBvJfKhSIW5EOQOkOn1_z5K848x_pwYouI",
  authDomain: "getitdone-d74f1.firebaseapp.com",
  projectId: "getitdone-d74f1",
  storageBucket: "getitdone-d74f1.appspot.com",
  messagingSenderId: "45109995152",
  appId: "1:45109995152:web:4055b44d47cbdfd5f49a15",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize services
const db = initializeFirestore(firebaseApp, {
  ignoreUndefinedProperties: true,
});
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

// Timestamp
const timestamp = serverTimestamp();

export { db, auth, storage, timestamp };
