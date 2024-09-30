import { details} from "./reduce_detail_task.js"
import { reduce} from "./reduce_detail_task.js"
import { createEventAddTask } from "./add_delete_fix_task.js";
import { createEventConfirmTask } from "./add_delete_fix_task.js";
import { createEventDeleteTask } from "./add_delete_fix_task.js";
import { createEventEditTask } from "./add_delete_fix_task.js";
import { loadTask_and_event } from "./add_delete_fix_task.js";
import { displayTime} from "./timeHandler.js";
import { updateTimeleft} from "./loadTask.js";
import { createEventSearch} from "./search.js";
import { createEventReloadSearched} from "./search.js";
import { deleteCollectionTask, load_toFireStore, loadTask_fromFirestore_toList, reloadAll } from "./app.js";
import { createEventSort } from "./sort.js";

//1. Rút gọn, Hiển thị chi tiết task
const task_item_iconZoom = document.querySelectorAll('.head .ctn-reducebutton');
for(const elm of task_item_iconZoom){
    elm.setAttribute("taskDisplayStatus", "Chi tiết");
};

//console.log(task_item_iconZoom)


for(const elm of task_item_iconZoom){
    elm.addEventListener("click", function(event){
        if(elm.getAttribute('taskDisplayStatus') === "Chi tiết"){
            elm.innerHTML = `<i class="fa-solid fa-arrow-down board-header-icon"></i>`

            details(elm.getAttribute('task-status'));
            elm.setAttribute("taskDisplayStatus", "Rút gọn");
        }
        else{
            elm.innerHTML = `<i class="fa-solid fa-arrow-up board-header-icon"></i>`
            reduce(elm.getAttribute('task-status'));
            elm.setAttribute("taskDisplayStatus", "Chi tiết");
        }
    })
};
//2. ADD thêm task:
createEventAddTask()
    //Load task lần đầu khi vô web
loadTask_and_event("noReload")

//3. Delete Task.  
createEventDeleteTask()

//4.Fix Task
createEventEditTask()
 // Tạo 1 cái sk cho nút xác nhận


//5. Hiển thị thời gian thực trên web 
setInterval(displayTime, 1000)

//6. Update Task theo giời gian:
    //a. Update xem có cái nào hết hạn chưa: Chung với cái loadTaskandEvent
    //b. Update Time Left
setInterval(updateTimeleft, 1000)

//7. Tạo event xác nhận hoàn thành task: Chung với loadTaskandEvent


//8. Tìm kiếm:
createEventSearch()

//9. Tạo nút để reload mấy cái tìm kiếm, hiển thị trang ban đầu:
createEventReloadSearched()
//10. Tao nut sort:
createEventSort()


//load_toFireStore() //Check: Oke
loadTask_fromFirestore_toList() //Check: Oke
//deleteCollectionTask() //Check: Đã oke
//reloadAll() //Check: Oke