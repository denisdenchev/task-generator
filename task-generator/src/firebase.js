import firebase from "firebase";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBlHRWgEbZIMmQ8l7nl7JwngbSlINBuCsw",
  authDomain: "task-generator-67f2e.firebaseapp.com",
  databaseURL: "https://task-generator-67f2e.firebaseio.com",
  projectId: "task-generator-67f2e",
  storageBucket: "task-generator-67f2e.appspot.com",
  messagingSenderId: "1009657894650",
  appId: "1:1009657894650:web:334121951fb48a1ed31b43",
  measurementId: "G-JWRXFP7YDC"
});

const firestore = firebaseApp.firestore();

export { firestore };
