// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnlGczEyB7iDHoppuvxMiNNMpOk5emn14",
  authDomain: "blogging-app-9c8a2.firebaseapp.com",
  projectId: "blogging-app-9c8a2",
  storageBucket: "blogging-app-9c8a2.appspot.com",
  messagingSenderId: "624742125043",
  appId: "1:624742125043:web:cb07a87ecc9b1bf8b11686"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);