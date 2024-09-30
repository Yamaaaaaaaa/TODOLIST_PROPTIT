// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { 
    getDatabase, set, ref, 
    child, push, update,
    get
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
  
//Lưu ý là mấy cái hàm là có sẵn nên phải import chuẩn tên đó
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA50RLbDWLtJsJ2tRWw-vq7h_V7gTwpMZo",
  authDomain: "todolist-login-947de.firebaseapp.com",
  databaseURL: "https://todolist-login-947de-default-rtdb.firebaseio.com",
  projectId: "todolist-login-947de",
  storageBucket: "todolist-login-947de.appspot.com",
  messagingSenderId: "195951382294",
  appId: "1:195951382294:web:169497c13e4373deac8a37",
  measurementId: "G-WG1BWJ4S39",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = getDatabase(app); // Dùng cái j thì getDTB ở cái đó

console.log(database)


// 1. Lưu dữ liệu:
//import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

function writeUserData(userId, name, email) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
  })
  .then(() => {
    // Data saved successfully!
    console.log("Data saved successfully");
  })
  .catch((error) => {
    // The write failed...
    console.log(error)
  });
}


//2. Đọc dữ liệu:
//import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
function getData(userId){
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
        console.log(snapshot.val());
        } else {
        console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}



//3. Cập nhật hoặc xóa dữ liệu:
//import { getDatabase, ref, child, push, update } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

function writeNewPost(uid, username, title, body) {
  const db = getDatabase();

  // A post entry.
  const postData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
    starCount: 0,
  };

  // Get a key for a new Post.
  const newPostKey = push(child(ref(db), 'posts')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return update(ref(db), updates);
}



//Event:
let addtoDTBbtn = document.querySelector('#addtoDTB-btn')
let uid = 1;
addtoDTBbtn.addEventListener('click', function(){
    let email = document.querySelector('#input-email').value
    let pass = document.querySelector('#input-pass').value
    writeUserData(uid, email, pass);
    uid ++;
})

let showdata = document.querySelector('#getData-btn')
showdata.addEventListener('click', function(){
    getData("1")
})

let updateData = document.querySelector('#updateData-btn')
let tmp = "1";
updateData.addEventListener('click', function(){
    writeNewPost(1, "SON" + tmp, "CTRl", "TMP")
    tmp += "0"
})

let deleteData = document.querySelector('#deleteData-btn')
deleteData.addEventListener('click', function(){
    handledeleteData();
})