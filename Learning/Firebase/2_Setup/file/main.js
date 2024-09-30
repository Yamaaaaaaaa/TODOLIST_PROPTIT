// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Youdr web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA50RLbDWLtJsJ2tRWw-vq7h_V7gTwpMZo",
  authDomain: "todolist-login-947de.firebaseapp.com",
  projectId: "todolist-login-947de",
  storageBucket: "todolist-login-947de.appspot.com",
  messagingSenderId: "195951382294",
  appId: "1:195951382294:web:169497c13e4373deac8a37",
  measurementId: "G-WG1BWJ4S39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
