// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMr_voZ2Ghb_Z509My9w7fStPKsN25miA",
  authDomain: "quizapp-8e487.firebaseapp.com",
  projectId: "quizapp-8e487",
  storageBucket: "quizapp-8e487.appspot.com",
  messagingSenderId: "405172355505",
  appId: "1:405172355505:web:3e37719878718d1b047d90",
  measurementId: "G-19DMTP3SM4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)