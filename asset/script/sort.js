import { loadTask_and_event } from "./add_delete_fix_task.js";
import { listTask_done, listTask_missed, listTask_todo } from "./loadTask.js";

export function createEventSort(){
    const sorttaskButton = document.querySelectorAll('#sort-task')
    //Thêm 1 ELM để nhập task( + tạo sự kiện cho button Xác nhận tạo task)
    for(const elm of sorttaskButton){
        elm.addEventListener('click', function() {
            sorttask(elm);
            console.log("Sorting");
            
        })
    }
}

function sorttask(elm){
    const board_item = document.querySelectorAll('.board-item')
    for(let elmDad of board_item){
        if(elmDad.contains(elm)){
            if(elmDad.getAttribute("task-status") == "todo") sortList(listTask_todo)
            else if(elmDad.getAttribute("task-status") == "done") sortList(listTask_done)
            else if(elmDad.getAttribute("task-status") == "missed") sortList(listTask_missed)
        }
    }
}

function sortByDate(dates) {
    return dates.sort((a, b) => {
      const dateA = new Date(a.deadline);
      const dateB = new Date(b.deadline);
      console.log(dateA.getTime() - dateB.getTime());
      
      return - dateA.getTime() + dateB.getTime();
    });
}

function sortList(listType){
    console.log("Trc: ", listType)
    listType = sortByDate(listType);
    console.log("Sau: ", listType);
    loadTask_and_event()
}