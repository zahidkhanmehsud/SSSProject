// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth'
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4tXG4qZq0fXz_xtaRiyyLwuFvSQLqjIk",
    authDomain: "nodemcu-esp-12f.firebaseapp.com",
    databaseURL: "https://nodemcu-esp-12f-default-rtdb.firebaseio.com",
    projectId: "nodemcu-esp-12f",
    storageBucket: "nodemcu-esp-12f.appspot.com",
    messagingSenderId: "253056476163",
    appId: "1:253056476163:web:eb92b6e96da68a322cda36",
    measurementId: "G-36162RQ5V2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
export { auth, database };