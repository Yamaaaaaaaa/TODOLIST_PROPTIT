import { reloadAll } from "./app.js";
import { listTask_todo } from "./loadTask.js";
import { listTask_done } from "./loadTask.js";
import { listTask_missed } from "./loadTask.js";
import { updateTimeforTask } from "./loadTask.js";
import { createEventOpenModal } from "./modalControl.js";
//1. LOAD TASK: Load các task trong list vào Board:
function loadd(elmDad, listTask_type, type, priority, color){
    elmDad.innerHTML = ``;
    let id = 0; 
    let display_btnChecktaskAsCompleted;
    if(type == 'done'){
        display_btnChecktaskAsCompleted = 'none'
    }
    else{
        display_btnChecktaskAsCompleted = 'blocked'
    }
    for(let task of listTask_type){
        if(task.searched == "yes"){
            elmDad.innerHTML = `<div class="task-item" task-status="${type}" index = ${id}>
                                    <div class="item-head">
                                        <i class="fas fa-circle" style="margin-right:10px;color: ${color};"></i>
                                        <span>${priority}</span>
                                        <i class="fa-solid fa-wrench" id="fix-task" task-status="${type}"></i>
                                        <i class="fa-solid fa-trash header-icon" id="delete-task" task-status="${type}"></i>
                                        <i class="fa-solid fa-circle-check header-icon" id="tick-ask-completed" style="display: ${display_btnChecktaskAsCompleted}"></i>
                                    </div>
                                    <h3 class="item-title">${task.name}</h3>
                                    <p class="p-item-description">${task.description}</p>
                                    <div class="item-date">
                                        <i class="fa-solid fa-calendar-days"></i>
                                        <span>Due Date:</span>
                                    </div>
                                    <p class="p-item-date">${task.deadline}</p>
                                    <p class="p-item-date" style = "margin-top: 3px;">${task.deadline_time}</p>
                                    <div class="item-type">
                                        <i class="fa-solid fa-tag"></i>
                                        <span>Type: </span>
                                    </div>
                                    <p class="p-item-type">${task.type}</p>
                                    <div class="item-timeleft">
                                        <i class="fa-solid fa-clock"></i>
                                        <span style="margin-right: 10px;">Time Left:</span>
                                        <p class="p-item-timeleft">${task.timeleft}</p>
                                    </div>                                   
                                </div>` + elmDad.innerHTML;
        }
        id++;
    }
}
export function loadTasktoHTML(elmDad){
    if(elmDad.getAttribute('task-status') == 'todo'){
        loadd(elmDad, listTask_todo, 'todo','Cần Làm', 'gray')
    }
    else if(elmDad.getAttribute('task-status') == 'done'){
        loadd(elmDad, listTask_done, 'done', 'Đã hoàn thành', 'green')
    }
    else{
        loadd(elmDad, listTask_missed, 'missed', 'Đã bỏ lỡ', 'red')
    }
}
    //Hàm tổng hợp các cái cần load: Element, Event trong các ELM
export function loadTask_and_event(checkReload){
    updateTimeforTask()
    const taskList = document.querySelectorAll('.task-list')
    for(const elmTasklist of taskList){
        loadTasktoHTML(elmTasklist)
    }
    createEventDeleteTask()
    createEventEditTask()
    createEventCompletedTask()
    if(checkReload != "noReload") reloadAll()
}

let checkFormAdd_AndFixTask = "no"; // Biến để kiểm tra xem đã có 1 cái form add nào chưa, nếu có rồi thì ko cho thêm nữa.
//2. ADD TASK:
export function createEventAddTask(){
    const addtaskButton = document.querySelectorAll('#add-task')
    //Thêm 1 ELM để nhập task( + tạo sự kiện cho button Xác nhận tạo task)
    for(const elm of addtaskButton){
        elm.addEventListener('click', function() {
            addTask(elm)
            createEventConfirmTask() //Thêm sự kiện cho cái tk button để hoàn tất nhập liệu
            createEventConfirmNotAddTask()
        })
    }
}
function addHTML(elmDad, elm){
    if(checkFormAdd_AndFixTask == "no"){
        const taskList = document.querySelectorAll('.task-list')
        let s1 = elm.getAttribute('task-status')
        for(let elmChild of taskList){
            if(elmDad.contains(elmChild)){
                elmChild.innerHTML = `<form class="inputTask" task-status="${s1}">
                                            <div class="inputTask-head">
                                                <h2>Add Task: </h2>
                                                <i class="fa-solid fa-x modalButton" task-status="${s1}" style="cursor: pointer;"></i>
                                                <i class="fa-solid fa-check modalButton" task-status="${s1}" style="cursor: pointer;"></i>
                                            </div>
                                            <input class="input-titleTask" type="text" placeholder="Title">
                                            <textarea class="input-descriptionTask" placeholder="Description"></textarea>
                                            <div class="item-date">
                                                <i class="fa-solid fa-calendar-days"></i>
                                                <span>Due Date</span>
                                            </div>
                                            <input class="inputTime" type="date"></input>
                                            <input class="inputTime2" type="time"></input>
                                            <div class="item-type">
                                                <span>Type: </span>
                                            </div>
                                            <input class="input-typeTask" type="text" placeholder="Type">
                                        </form>` + elmChild.innerHTML;
            }
        }
        checkFormAdd_AndFixTask = "yes"
    }
}
export function addTask(elm){
    const board_item = document.querySelectorAll('.board-item')
    for(let elmDad of board_item){
        if(elmDad.contains(elm)){
            addHTML(elmDad, elm)
           // createEventOpenModal()
        }
    }
}
// Idea: Add 1 form xong, sau khi điền thì tạo 1 cái hàm duyệt tất cả các task và hiển thị lại (Cái add chỉ là tạm hiển thị đó, ko phải load)
//=> Cần 1 list lưu thông tin các task
//- confirm add task:
export function createEventConfirmTask(){
    const confirmAddTask = document.querySelectorAll('.inputTask .fa-check')
    for(const elm of confirmAddTask){
        elm.addEventListener('click', function() {
            confirmTask(elm)
          //  createEventOpenModal();
        })
    }
}
export function createEventConfirmNotAddTask(){
    const confirmAddTask = document.querySelectorAll('.inputTask .fa-x')
    for(const elm of confirmAddTask){
        elm.addEventListener('click', function() {
            confirmNotAddTask(elm)
        })
    }
}


function confirmTask(elm){
    const task = document.querySelectorAll('.inputTask') // Cái này phải tạo bên trong, nếu ko mỗi lần gọi hàm nó lại dùng lại cái cũ thù dở
    for(let elmDad of task){
        if(elmDad.contains(elm)){
            //add task to list:
            
            let task_title = elmDad.childNodes[3].value;
            let task_description = elmDad.childNodes[5].value;
            let task_date = elmDad.childNodes[9].value;
            let task_time = elmDad.childNodes[11].value;

            let task_type = elmDad.childNodes[15].value;

            console.log(elmDad.childNodes);
            
        
            if(elmDad.getAttribute('task-status') == 'todo'){
                listTask_todo.unshift({
                    id : "a",
                    priority: "Cần Làm",
                    name: task_title,
                    description: task_description,
                    deadline: task_date,
                    deadline_time: task_time,
                    type: task_type,
                    timeleft: task_time,
                    searched: "yes"
                })
                console.log("todo: ", listTask_todo)
            }
            else if(elmDad.getAttribute('task-status') == 'done'){
                listTask_done.unshift({
                    id : "a",
                    priority: "Đã hoàn thành",
                    name: task_title,
                    description: task_description,
                    deadline: task_date,
                    deadline_time: task_time,
                    type: task_type,
                    timeleft: task_time,
                    searched: "yes"
                })
                console.log("done: ", listTask_done)
            }
            else{
                listTask_missed.unshift({
                    id : "a",
                    priority: "Đã bỏ lỡ",
                    name: task_title,
                    description: task_description,
                    deadline: task_date,
                    deadline_time: task_time,
                    type: task_type,
                    timeleft: task_time,
                    searched: "yes"
                })
                console.log("missed: ",listTask_missed)
            }
            loadTask_and_event();
            // console.log("Title: ", task_title)
            // console.log("description : ", task_description)
            // console.log("date: ", task_date)
            // console.log("type: ", task_type)
            checkFormAdd_AndFixTask = "no";
        }
    }
}
//event không thêm task nữa:
function confirmNotAddTask(elm){
    loadTask_and_event();
    checkFormAdd_AndFixTask = "no";
}
//event không sửa task nữa
function confirmNotTask(elm, infoOldTask){
    const task = document.querySelectorAll('.inputTask') // Cái này phải tạo bên trong, nếu ko mỗi lần gọi hàm nó lại dùng lại cái cũ thù dở
    for(let elmDad of task){
        if(elmDad.contains(elm)){
            //add task to list:

            if(elmDad.getAttribute('task-status') == 'todo'){
                listTask_todo.unshift({
                    id : "A",
                    priority: "Cần Làm",
                    name: infoOldTask.name,
                    description: infoOldTask.description,
                    deadline: infoOldTask.deadline,
                    deadline_time: infoOldTask.deadline_time,
                    type: infoOldTask.type,
                    timeleft: infoOldTask.timeleft,
                    searched: "yes"
                })
                console.log("todo: ", listTask_todo)
            }
            else if(elmDad.getAttribute('task-status') == 'done'){
                listTask_done.unshift({
                    id : "a",
                    priority: "Đã hoàn thành",
                    name: infoOldTask.name,
                    description: infoOldTask.description,
                    deadline: infoOldTask.deadline,
                    deadline_time: infoOldTask.deadline_time,
                    type: infoOldTask.type,
                    timeleft: infoOldTask.timeleft,
                    searched: "yes"
                })
                console.log("done: ", listTask_done)
            }
            else{
                listTask_missed.unshift({
                    id : "a",
                    priority: "Đã bỏ lỡ",
                    name: infoOldTask.name,
                    description: infoOldTask.description,
                    deadline: infoOldTask.deadline,
                    deadline_time: infoOldTask.deadline_time,
                    type: infoOldTask.type,
                    timeleft: infoOldTask.timeleft,
                    searched: "yes"
                })
                console.log("missed: ",listTask_missed)
            }
            loadTask_and_event();
            checkFormAdd_AndFixTask = "no";
            // console.log("Title: ", task_title)
            // console.log("description : ", task_description)
            // console.log("date: ", task_date)
            // console.log("type: ", task_type)
        }
    }
}

//3. DELETE TASK:
export function deleteTask(elm){
    const task_item = document.querySelectorAll('.task-item')
    for(let item of task_item){
        if(item.contains(elm)){
            let id = item.getAttribute('index') // Lấy ra vị trí của nó ở trong list
            if(item.getAttribute('task-status') == 'todo'){
                listTask_todo.splice(id, 1);
            }
            else if(item.getAttribute('task-status') == 'done'){
                listTask_done.splice(id, 1);
            }
            else if(item.getAttribute('task-status') == 'missed'){
                listTask_missed.splice(id, 1);
            }
            loadTask_and_event()
            break;
        }
    }
}
//-Tạo 1 hàm để tạo event mỗi khi load lại các task
export function createEventDeleteTask(){
    const deleteTaskButton = document.querySelectorAll('#delete-task')
    for(const elm of deleteTaskButton){
        elm.addEventListener('click', function() {
            deleteTask(elm)
        })
    }
}


//4.EDIT TASK: Mỗi khi ấn vào sửa, thì ta tạm xóa cái tk hiện tại đi, thêm 1 cái form sửa vào.
        // Sau khi sửa xong thì add lại vô là oke (Dùng luôn hàm add)
export function addEditTaskBoard(infoTask){
    const taskList = document.querySelectorAll('.task-list')
    let s1 = infoTask.typeELM;
    let deadlineTime = infoTask.deadline_time;
    let deadlineDate = infoTask.deadline;
    for(let elmDad of taskList){
        if(elmDad.getAttribute('task-status') == infoTask.typeELM){
            elmDad.innerHTML = `<form class="inputTask" task-status="${s1}">
                                    <div class="inputTask-head">
                                        <h2>Edit Task: </h2>
                                        <i class="fa-solid fa-x modalButton" task-status="${s1}" style="cursor: pointer; "></i>
                                        <i class="fa-solid fa-check modalButton" task-status="${s1}" style="cursor: pointer;"></i>
                                    </div>
                                    <input class="input-titleTask" type="text" placeholder="Title" value="${infoTask.name}">
                                    <textarea class="input-descriptionTask" placeholder="Description">${infoTask.description}</textarea>
                                    <div class="item-date">
                                        <i class="fa-solid fa-calendar-days"></i>
                                        <span>Due Date</span>
                                    </div>
                                    <input class="inputTime" type="date" value="${deadlineDate}"></input>
                                    <input class="inputTime2" type="time" value="${deadlineTime}></input>
                                    <div class="item-type">
                                        <span>Type: </span>
                                    </div>
                                    <input class="input-typeTask" type="text" placeholder="Type" value ="${infoTask.type}">
                            </form>` + elmDad.innerHTML;
        }
    }
    const confirmAddTask = document.querySelectorAll('.inputTask .fa-check')
    for(const elm of confirmAddTask){
        elm.addEventListener('click', function() {
            confirmTask(elm)
        })
    }

    const confirmNotAddTask = document.querySelectorAll('.inputTask .fa-x')
    for(const elm of confirmNotAddTask){
        elm.addEventListener('click', function() {
            confirmNotTask(elm, infoTask)
        })
    }
}
export function editTask(elm){
    if(checkFormAdd_AndFixTask == "no"){
        const task_item = document.querySelectorAll('.task-item')
        var infoTask;
        for(let item of task_item){
            if(item.contains(elm)){
                let task_title = item.childNodes[3].innerText;
                let task_description = item.childNodes[5].innerText;
                let task_date = item.childNodes[9].innerText;
                let task_Time = item.childNodes[11].innerText;
                let task_type = item.childNodes[13].innerText;
                let s1 = elm.getAttribute('task-status')
                infoTask = {
                    typeELM: s1,
                    priority: "Cần Làm",
                    name: task_title,
                    description: task_description,
                    deadline: task_date,
                    deadline_time: task_Time,
                    type: task_type,
                    timeleft: '00h-00p-2s',
                    searched: "yes"
                }
            }
        }
        
        deleteTask(elm)
        addEditTaskBoard(infoTask)
        checkFormAdd_AndFixTask = "yes"
    }
}
export function createEventEditTask(){
    const editTaskButton = document.querySelectorAll('#fix-task')
    for(const elm of editTaskButton){
        elm.addEventListener('click', function() {
            editTask(elm)
        })
    }
}
           

//5. MARK TASK AS COMPLETED:
export function completedTask(elm){
    const task_item = document.querySelectorAll('.task-item')
    for(let item of task_item){
        if(item.contains(elm)){
            let id = item.getAttribute('index')
            let typeTask = item.getAttribute('task-status')

            if(typeTask == 'todo'){
                listTask_done.unshift(listTask_todo[id])
                listTask_todo.splice(id, 1);
            }
            else if(typeTask == 'missed'){
                listTask_done.unshift(listTask_missed[id])
                listTask_missed.splice(id, 1);
            }
        }
    }
    loadTask_and_event()
}
export function createEventCompletedTask(){
    const cpltedTaskButton = document.querySelectorAll('#tick-ask-completed')
    for(const elm of cpltedTaskButton){
        elm.addEventListener('click', function() {
            completedTask(elm)
        })
    }
}



