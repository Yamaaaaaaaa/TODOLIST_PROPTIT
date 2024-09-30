// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getFirestore} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import {
    getStorage, 
    ref
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js"

const firebaseConfig = {
    apiKey: "AIzaSyDuElHHmb8h3gkJzKFLPthy2hXzM95t4pg",
    authDomain: "todolist-pro-712d4.firebaseapp.com",
    projectId: "todolist-pro-712d4",
    storageBucket: "todolist-pro-712d4.appspot.com",
    messagingSenderId: "338446864322",
    appId: "1:338446864322:web:adc93ad97d5dd4c886505b",
    measurementId: "G-KLRY92LTB6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



//III. FireDatabase:
export const database = getFirestore(app)

//IV. Storage:
export const storage = getStorage(app)
