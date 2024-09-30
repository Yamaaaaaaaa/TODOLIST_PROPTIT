import {auth} from './app.js'
import {handleLogin} from './app.js'
import {handleSubmit} from './app.js'
import {handleSign_withPopupGG} from './app.js'
import {handleAddData} from './app.js'
import {handleGetData} from './app.js'
import {handleUpdateData} from './app.js'
import {handledeleteData} from './app.js'
import {handleUploadFile} from './app.js'



let subbtn = document.querySelector('#submit-btn')
subbtn.addEventListener('click', function(){
    let email = document.querySelector('#input-email').value
    let pass = document.querySelector('#input-pass').value

    handleSubmit(email, pass);
})

let loginbtn = document.querySelector('#login-btn')
loginbtn.addEventListener('click', function(){
    let email = document.querySelector('#input-email').value
    let pass = document.querySelector('#input-pass').value

    handleLogin(email, pass);
})

let ggloginbtn = document.querySelector('#gglogin-btn')
ggloginbtn.addEventListener('click', function(){
    handleSign_withPopupGG();
})

let addtoDTBbtn = document.querySelector('#addtoDTB-btn')
addtoDTBbtn.addEventListener('click', function(){
    let email = document.querySelector('#input-email').value
    let pass = document.querySelector('#input-pass').value
    handleAddData(email, pass);
})

let showdata = document.querySelector('#getData-btn')
showdata.addEventListener('click', function(){
    handleGetData();
})

let updateData = document.querySelector('#updateData-btn')
updateData.addEventListener('click', function(){
    handleUpdateData();
})

let deleteData = document.querySelector('#deleteData-btn')
deleteData.addEventListener('click', function(){
    handledeleteData();
})


let uploadFile = document.querySelector('#uploadFile-btn')
uploadFile.addEventListener('click', function(){
    handleUploadFile(document.querySelector('#uploadFile').files[0]);
    console.log(document.querySelector('#uploadFile').files[0])
})