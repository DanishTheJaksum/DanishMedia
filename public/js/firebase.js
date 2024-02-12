// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVhdEqSOG5ifCX5uhG8XHmDyDVME0616E",
  authDomain: "abbasimedia-30d9c.firebaseapp.com",
  projectId: "abbasimedia-30d9c",
  storageBucket: "abbasimedia-30d9c.appspot.com",
  messagingSenderId: "432874569223",
  appId: "1:432874569223:web:b19b6c8faa50867028f4a2",
  measurementId: "G-HDK1YT3WSR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
