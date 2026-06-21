
 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
  import {  getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
  import { getAuth , createUserWithEmailAndPassword  , signInWithEmailAndPassword , onAuthStateChanged, updateEmail , updatePassword , signOut , verifyBeforeUpdateEmail , GoogleAuthProvider , getRedirectResult , signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
 import { getFirestore , doc, setDoc  , collection ,  addDoc} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyD_pBmBtsuiNWtyVvo3QmrWp-sI2rmqJ_Q",
    authDomain: "e-commerce-bakhtiar.firebaseapp.com",
    projectId: "e-commerce-bakhtiar",
    storageBucket: "e-commerce-bakhtiar.firebasestorage.app",
    messagingSenderId: "53846360369",
    appId: "1:53846360369:web:9a67d948b6c0cb2b173010",
    measurementId: "G-RP1FLCLRBX"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);  
  const auth = getAuth(app);
  const db = getFirestore(app);




  export {
    auth,
    db,
    doc,
    setDoc,
    collection,
    addDoc,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateEmail,
    updatePassword,
    signOut,  
    verifyBeforeUpdateEmail,
    GoogleAuthProvider,
    getRedirectResult,
    signInWithPopup
  };





  
