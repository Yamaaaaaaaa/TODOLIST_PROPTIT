import { app, database, storage} from './firebaseConfig.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { 
    collection, 
    addDoc, 
    getDocs, onSnapshot,
    updateDoc, doc,
    deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL 
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js"

import { listTask_done, listTask_missed, listTask_todo } from './loadTask.js';


console.log(app)
console.log("Database: ", database)

    //1. VD: Ta muốn làm 1 cái database để thêm các email, pass của từng user: (nếu ko có sẵn trong firestore thì nó sẽ tự tạo mới.)
const collectionRef = collection(database, 'users')

export const handleAddData_User = (mail, pass) => {
    // Thêm User, Dùng khi làm cái login thôi zzzzz
    addDoc(collectionRef, {  
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
export const handleGetData = (collecRef, listTask) => {
    getDocs(collecRef).then((response) => {
        let data = response.docs.map((item) => {
            // console.log(item)
            // console.log("Item data", item.data())
            // console.log("Item ID", item.id)
            return {...item.data(), id: item.id}
        })  
        console.log(data)

        for(let item of data){
            listTask.unshift({
                priority: item.priority,
                name: item.name,
                description: item.description,
                deadline: item.deadline,
                deadline_time: item.deadline_time,
                type: item.type,
                timeleft: item.timeleft,
                searched: item.searched
            }) 
        }
    })

}



async function deteTask_fromListTask(nameList) {
    const docUser2 = doc(database, "users", "user_22222")
    const refTask = collection(docUser2, nameList)
   
    let listTask_ref = [];
    //BẮT BUỘC PHẢI DÙNG ASYNC-AWAIT. THÌ CÁI MẢNG NÓ MỚI LẤY KỊP DATA, NÓ MÀ PENDING CHẠY XUỐNG DƯỚI LÀ OẲNG.
    await getDocs(refTask).then((response) => {
        let data = response.docs.map((item) => {
            listTask_ref.push(item.id +"")
            return {...item.data(), id: item.id}
        })  
       // console.log(data)
    })
    
    //console.log(listTask_ref);
    for(let id of listTask_ref){
        const docID_Task = doc(refTask, id)
       // console.log(id)
        deleteDoc(docID_Task)
        .then(() => {
            console.log(id, " Data Deleted")
        })
        .catch((err) => {
            console.log(err.message)
        })
    }
}
export function deleteCollectionTask(){ 
    // Xóa tất cả các Task trong 1 Collection listTask
    deteTask_fromListTask("listTask_todo")
    deteTask_fromListTask("listTask_done")
    deteTask_fromListTask("listTask_missed")
} 



export function loadTask_fromList_toFirestore(listTask, collecRef){
    // Cái này là để add các trường cho 1 collection thôi.
    console.log(listTask)
    for(let i = 0 ; i < listTask.length; i++){
        addDoc(collecRef, listTask[i])
        .then(() => {
           // console.log("CLREF After Add: ", listTask[i])
            console.log("Data Added")
        })
        .catch((err) => {
            console.log(err.message)
        })        
    }  
} 
//1. Update Full Task for list from firestore:
export function loadTask_fromFirestore_toList(){
    const database_User = doc(database, "users", "user_22222") 
    const collectionRef_Task_Todo = collection(database_User, 'listTask_todo')
    const collectionRef_Task_Done = collection(database_User, 'listTask_done')
    const collectionRef_Task_Missed = collection(database_User, 'listTask_missed')
    handleGetData(collectionRef_Task_Todo, listTask_todo)
    handleGetData(collectionRef_Task_Done, listTask_done)
    handleGetData(collectionRef_Task_Missed, listTask_missed)
}


export async function load_toFireStore(){
    const database_User = doc(database, "users", "user_22222")  // Trong VD này t lấy mỗi tk thứ 1 trong db (lên mà xem nó là j) => Update nó thôi
    console.log(database_User)
    const collectionRef_Task_Todo = collection(database_User, 'listTask_todo')
    const collectionRef_Task_Done = collection(database_User, 'listTask_done')
    const collectionRef_Task_Missed = collection(database_User, 'listTask_missed')
    loadTask_fromList_toFirestore(listTask_todo, collectionRef_Task_Todo)
    loadTask_fromList_toFirestore(listTask_done, collectionRef_Task_Done)
    loadTask_fromList_toFirestore(listTask_missed, collectionRef_Task_Missed)
}
export async function reloadAll(){
    // Xóa hết tất cả data cũ, load lại full task. (Cách này hơi cực đoan nhưng lười quá :))))))
    // Phải setimeout hoặc async await jj đó, nếu ko thì nó chạy load trc đó :vvvv
    setTimeout( () => {
        deleteCollectionTask()
    }, 1000)

    setTimeout( () => {
        load_toFireStore()
    }, 3000) 
}



