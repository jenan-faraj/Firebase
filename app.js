import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";



const firebaseConfig = {
  apiKey: "AIzaSyCx3Llkqy1lZ5VOdzkpatbBO3DxBONfiFI",
  authDomain: "authproject-8d045.firebaseapp.com",
  projectId: "authproject-8d045",
  storageBucket: "authproject-8d045.firebasestorage.app",
  messagingSenderId: "1061873219078",
  appId: "1:1061873219078:web:661e25a29cd296a8d6b587"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const userEmail = document.querySelector("#userEmail");
const userPassword = document.querySelector("#userPassword");
const authForm = document.querySelector("#authForm");
const secretContent = document.querySelector("#secretContent");
const signUpButton = document.querySelector("#signUpButton");
const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");

secretContent.style.display = "none";

const userSignUp = async () => {
  const signUpEmail = userEmail.value;
  const signUpPassword = userPassword.value;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      signUpEmail,
      signUpPassword

    );
    const user = userCredential.user;
    console.log(user);
    alert("Your account has been created");

  } catch (err) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(errorCode + errorMessage);
  }

};

const userSignIn = async () => {
  const signInEmail = userEmail.value;
  const signInPassword = userPassword.value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      signInEmail,
      signInPassword
    );
    const user = userCredential.user;
    // alert("You have signed in successfully!");

    document.getElementById('x').addEventListener("click", function () {
      window.location.href = './index.html';
    });



  } catch (err) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(errorCode + errorMessage);
  }
};

const checkAuthState = async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      authForm.style.display = "none";
      secretContent.style.display = "block";
    } else {
      authForm.style.display = "block";
      secretContent.style.display = "none";
    }
  });
};

const userSignOut = async () => {
  await signOut(auth);

};

checkAuthState();

signUpButton.addEventListener("click", userSignUp);
signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);