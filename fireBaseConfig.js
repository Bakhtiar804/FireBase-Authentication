
 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
  import {  getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
  import { getAuth , createUserWithEmailAndPassword  , signInWithEmailAndPassword , onAuthStateChanged, updateEmail , updatePassword , signOut , verifyBeforeUpdateEmail , GoogleAuthProvider , getRedirectResult , signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
 import { getFirestore , doc, setDoc  , collection ,  addDoc} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

  const firebaseConfig = {

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





  
