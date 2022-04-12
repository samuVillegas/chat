import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmzvnkrY9p5aSAGhlpZGBvFQ5NNT74kf0",
    authDomain: "chat-1ea6c.firebaseapp.com",
    projectId: "chat-1ea6c",
    storageBucket: "chat-1ea6c.appspot.com",
    messagingSenderId: "41047799828",
    appId: "1:41047799828:web:49ce894544aaae11accf01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const providerGoogle = new GoogleAuthProvider();

const createUser = async (email, password) => {
    const response = await createUserWithEmailAndPassword(auth, email, password).then(userCredential => { return { error: false, data: userCredential.user } } ).catch(err => { return { error: true, data: err } })
    return response;
}

const logIn = async (email,password) => {
    const response = await signInWithEmailAndPassword(auth, email, password).then(userCredential => { return { error: false, data: userCredential.user } } ).catch(err => { return { error: true, data: err } })
    return response;
}

const logInGoogle = async () => {
signInWithPopup(auth, providerGoogle)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}


export { createUser, logIn, logInGoogle}