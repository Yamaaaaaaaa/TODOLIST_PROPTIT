import { app, database, storage} from './firebaseConfig.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { 
    collection, 
    addDoc, 
    getDocs, onSnapshot,
    updateDoc, doc, 
    deleteDoc 
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL 
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js"



console.log(app)
export let auth = getAuth()


//I. Đăng kí, đăng nhập bằng Email: 

//Hàm này để đăng nhập khi ta đã lấy đc những thông số email, pass (Có thể để ở trong cái event submit)
export const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        // ...
        console.log("Logged!Email: ", email, ". Pass: ", password);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Sai thông tin tk hoặc mk! " + errorMessage)
    });
}

//Hàm này để bắt đầu đăng kí khi ta đã lấy đc những thông số email, pass (Có thể để ở trong cái event submit thông tin đăng kí)
export const handleSubmit = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user)
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
        // ..
    });
}


//II. Đăng kí, nhập bằng tài khoản gg:

const provider = new GoogleAuthProvider(); // Tạo đối tượng xác thực gg

    // Phương thức này sẽ mở ra 1 popup để ta đăng nhập bằng tk gg

export const handleSign_withPopupGG = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        console.log(user)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

        alert(errorMessage)
    });
}    


//III. Firestore database:

console.log("Database: ", database)

    //1. VD: Ta muốn làm 1 cái database để thêm các email, pass của từng user :

const collectionRef = collection(database, 'users')


// Cách lấy được 1 Collection con ở trong 1 Phần tử thuộc Collection cha:
    // 1. Tạo 1 biến data của 1 phần tử con(phải có id). (VD: tk collection users có tk user có id:OcLFb722Hx7OuNmlSEX6)
    // 2. Tạo 1 biến lấy ra ref của tk collection con trong nó: VD mỗi tk con có 1 tk CLtion listTask_todo
    // 3. Nếu muốn add các cái tk con(ID auto) thì add như tk cha, nhưng cho tk con. (Ở cái phương thức hanleAdd thay ref => ref2 và thử)
const database_User = doc(database, "users", 'OcLFb722Hx7OuNmlSEX6')  // Trong VD này t lấy mỗi tk thứ 1 trong db (lên mà xem nó là j) => Update nó thôi
const collectionRef2 = collection(database_User, 'listTask_todo')
console.log(collectionRef2)



export const handleAddData = (mail, pass) => {
    // Cái này là để add các trường cho 1 collection thôi.
    addDoc(collectionRef, {  //có thể thay = db.collection(collectionRef).add({...})
        email: mail,
        password: pass
    })
    .then(() => {
        console.log("CLREF After Add: ", collectionRef)
        alert("Data Added")
    })
    .catch((err) => {
        alert(err.message)
    })
}
    //2. Nếu muốn xuất ra data:
export const handleGetData = () => {
    getDocs(collectionRef).then((response) => {
        //console.log(collectionRef)
        let data = response.docs.map((item) => {
           // console.log(item)
            console.log("Item data", item.data())
            console.log("Item ID", item.id)
            return {...item.data(), id: item.id}
        })  
        console.log(data)

        let toStrData = ''
        for(let item of data){
            toStrData = toStrData + "User: " + "Email: " + item.email + ".Pass: " + item.password + "\n" 
           // console.log(item)
        }
        document.querySelector('#showData').value = toStrData;
    })

    //getDoc realtime:On SnapShot
    // onSnapshot(collectionRef).then((response) => {
        
    //     let data = response.docs.map((item) => {
    //         return {...item.data(), id: item.id}
    //     })  
    //     console.log(data)

    //     let toStrData = ''
    //     for(let item of data){
    //         toStrData = toStrData + "User: " + "Email: " + item.email + ".Pass: " + item.password + "\n" 
    //         console.log(item)
    //     }
    //     document.querySelector('#showData').value = toStrData;
    // })
}

    //3. Update Data:
let cnt = 0;
export const handleUpdateData = () => {
    const docToUpdate = doc(database, "users", '4B7feowHgMub0ByRrqt0')  // Trong VD này t lấy mỗi tk thứ 1 trong db (lên mà xem nó là j) => Update nó thôi
    updateDoc(docToUpdate, {
        email: "Updated",
        password: "Xin chao, bn da bi hack" + cnt
    })
    .then(() => {
        cnt++
        alert("Data Updated")
    })
    .catch((err) => {
        alert(err.message)
    })
}


    //4. Delete Data:
export const handledeleteData = () => {
    const docToUpdate = doc(database, "users", 'userDefault')  // Trong VD này t xóa mỗi tk thứ 2 trong db (lên mà xem nó là j) (xóa đc 1 lần nên nếu muốn thử thì tạo)
    
    deleteDoc(docToUpdate)
    .then(() => {
        alert("Data Deleted")
    })
    .catch((err) => {
        alert(err.message)
    })
}
    

//IV. Storage.
console.log("Storage: ", storage)

    //1. Upload FIle
export const handleUploadFile = (file) => {
    const storageRef = ref(storage, file.name) // Tạo đường dẫn cho file cần up lên
    const uploadTask = uploadBytesResumable(storageRef, file)  // Tạo hàm khởi tạo quá trinhf Upload

    uploadTask.on(
        'state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log("Upload is: ", progress, "% done")
        },
        (error) => {
            // Handle unsuccessful uploads
            console.log(error.message)
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
            });
        }      
    )
}


