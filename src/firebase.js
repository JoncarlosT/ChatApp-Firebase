import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

// FIREBASE INITIALIZE

firebase.initializeApp({
  apiKey: "AIzaSyBsN7j9R_2lzH1r8FQhKeAyJpUfGd0KHSo",
  authDomain: "chatapp-bcaba.firebaseapp.com",
  projectId: "chatapp-bcaba",
  storageBucket: "chatapp-bcaba.appspot.com",
  messagingSenderId: "837688916956",
  appId: "1:837688916956:web:160b61c6d654d8758eed19",
  measurementId: "G-H6QZ3M995J",
});

export default firebase;
