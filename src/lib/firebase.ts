import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA0RlAy991fn13AGZZILW420dex3pIvVvU",
  authDomain: "birrpay-3924d.firebaseapp.com",
  projectId: "birrpay-3924d",
  storageBucket: "birrpay-3924d.appspot.com",
  messagingSenderId: "1918567096",
  appId: "1:1918567096:web:13d1e9219c51e87a22aa4d",
  measurementId: "G-NRS54TJSR4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// Enable offline persistence
enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser does not support persistence.');
    }
  });

export default app;