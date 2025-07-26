// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM5Rntp7kpQEkN70vGlQM0WsAUZwhposU",
  authDomain: "nitesh-blog.firebaseapp.com",
  projectId: "nitesh-blog",
  storageBucket: "nitesh-blog.firebasestorage.app",
  messagingSenderId: "773910551597",
  appId: "1:773910551597:web:017a403e9727f3addaeca4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
