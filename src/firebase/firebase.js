import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDO-b5edC_o43In8kn9kC8P-OpL4lJD5e4",
  authDomain: "final-projecttashkov.firebaseapp.com",
  projectId: "final-projecttashkov",
  storageBucket: "final-projecttashkov.firebasestorage.app",
  messagingSenderId: "367076453991",
  appId: "1:367076453991:web:f23589dd371bb1e6636ec2",
  measurementId: "G-P0QN8G589X"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireStore = getFirestore(app);
const storage = getStorage(app);

export {app,auth,fireStore,storage};