// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getFirestore} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import {
    getStorage, 
    ref
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js"


const firebaseConfig = {
    apiKey: "AIzaSyAACbXkZblxXCo5nVyKs9t7Hxd5dZiFcF8",
    authDomain: "fir-fcc-ecc17.firebaseapp.com",
    projectId: "fir-fcc-ecc17",
    storageBucket: "fir-fcc-ecc17.appspot.com",
    messagingSenderId: "58060879913",
    appId: "1:58060879913:web:4a93310d759d7baddb8438",
    measurementId: "G-9JNF2ZD5NS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



//III. FireDatabase:
export const database = getFirestore(app)

//IV. Storage:
export const storage = getStorage(app)
