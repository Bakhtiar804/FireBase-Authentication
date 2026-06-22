import {
  auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  updateEmail, updatePassword, onAuthStateChanged, GoogleAuthProvider,
  getRedirectResult, signInWithPopup, db, doc, setDoc, collection, addDoc
} from "./fireBaseConfig.js";


//   Sign Up Info

let userName = document.getElementById('username');
let PhoneNumber = document.getElementById('signUpPhone');
let countryName = document.getElementById('signUpCountry');
let DOB = document.getElementById('signUpDOB');
let signUpEmail = document.getElementById('signUpEmail');
let signUpPassword = document.getElementById('signUpPass');



//   Login Info

let signInEmail = document.getElementById('signInEmail');
let signInPassword = document.getElementById('signInPass');





let signUpBtn = document.getElementById('signUpBtn');

let isSigningUp = false;

signUpBtn.addEventListener("click", () => {




  let email = signUpEmail.value;
  let password = signUpPassword.value;



  const signUpUser = {
    FullName: userName.value,
    Phone: PhoneNumber.value,
    Country: countryName.value,
    DateOfBirth: DOB.value,
    Email: signUpEmail.value
  }

  isSigningUp = true;

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {


      // 1. Loading Alert Start (Jaise hi Auth account ban jaye aur DB ka kaam shuru ho)
    Swal.fire({
      title: 'Creating Profile...',
      text: 'Please wait while we set up your database records.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Yeh SweetAlert ka built-in loading animation spinner hai
      }
    });

      try {
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          ...signUpUser,
          userId: user.uid
        });


      } catch (error) {
        console.log(error)
      }
      // Compact Success Alert
      Swal.fire({
        icon: 'success',
        title: 'Registered!',
        text: 'Account created successfully.',
        width: '320px',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        window.location.replace("dashBoard.html");
      });

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);

      let errorText = "Registration failed.";
      if (errorCode === 'auth/email-already-in-use') errorText = "Email already in use.";
      if (errorCode === 'auth/invalid-email') errorText = "Invalid email format.";
      if (errorCode === 'auth/weak-password') errorText = "Password too weak.";

      // Compact Error Alert
      Swal.fire({
        icon: 'error',
        title: 'Sign Up Failed',
        text: errorText,
        width: '300px',
        heightAuto: true,
        confirmButtonColor: '#3085d6'
      });
    });

  document.getElementById('signUpEmail').value = "";
  document.getElementById('signUpPass').value = "";
  document.getElementById('username').value = "";
  document.getElementById('signUpPhone').value = "";
  document.getElementById('signUpCountry').value = "";
  document.getElementById('signUpDOB').value = "";


});


let signInBtn = document.getElementById('signInBtn');

const signIn = () => {

  let email = signInEmail.value;
  let password = signInPassword.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      window.location.replace("dashBoard.html");

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;


      let errorText = "Authentication failed.";
      if (errorCode === 'auth/invalid-credential' || errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
        errorText = "Incorrect email or password.";
      }
      if (errorCode === 'auth/invalid-email') errorText = "Invalid email format.";

      // Compact Error Alert
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: errorText,
        width: '300px',
        heightAuto: true,
        confirmButtonColor: '#3085d6'
      });
    });
  document.getElementById('signInEmail').value = "";
  document.getElementById('signInPass').value = "";
}


signInBtn.addEventListener('click', signIn);





let continueGoogleBtn = document.getElementById('googleSignInBtn');
let continueGoogleSignUpBtn = document.getElementById('googleSignUpBtn');

const continueWithGoogle = () => {

  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const user = result.user;

      // Compact Success Alert for Google Sign-In
      Swal.fire({
        icon: 'success',
        title: 'Welcome!',
        text: 'Google login successful.',
        width: '300px',
        timer: 1000,
        showConfirmButton: false
      }).then(() => {
        window.location.replace("dashBoard.html");
      });

    }).catch((error) => {

      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);

      // Custom messages for Google specific errors
      let errorText = "Google login failed.";
      if (errorCode === 'auth/popup-closed-by-user') {
        errorText = "The login popup was closed before finishing.";
      } else if (errorCode === 'auth/invalid-credential') {
        errorText = "The request configuration is invalid.";
      }

      // Compact Error Alert for Google Sign-In
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: errorText,
        width: '300px',
        heightAuto: true,
        confirmButtonColor: '#3085d6'
      });

      const email = error.customData ? error.customData.email : null;

      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });




}

continueGoogleSignUpBtn.addEventListener('click', continueWithGoogle);
continueGoogleBtn.addEventListener('click', continueWithGoogle);





onAuthStateChanged(auth, (user) => {
  const path = window.location.pathname;
  const isAuthPage = path.endsWith("index.html") || path === "/";

  if (user && isAuthPage && !isSigningUp) {
    console.log("Auto-login triggered safely.");
    window.location.replace("dashBoard.html");
  }
});