import firebase from "firebase/app";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyBrxewPvcY-bqgYr2wPhcy7VGUp75S_I84",
    authDomain: "moodframe-8e889.firebaseapp.com",
    projectId: "moodframe-8e889",
    storageBucket: "moodframe-8e889.appspot.com",
    messagingSenderId: "626432301228",
    appId: "1:626432301228:web:2a60eae9baf131c2b6e709",
    measurementId: "G-WS244D792C"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();