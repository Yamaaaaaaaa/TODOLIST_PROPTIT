import { loadTask_and_event } from "./add_delete_fix_task.js";
import { listTask_todo } from "./loadTask.js";
import { listTask_done } from "./loadTask.js";
import { listTask_missed } from "./loadTask.js";

export function createEventSearch(){
    
    const searchInput = document.getElementById('search_bar');
    let isFocused = false;
    
    searchInput.addEventListener('focus', () => {
        isFocused = true;
    });
    
    searchInput.addEventListener('blur', () => {
        isFocused = false;
    });
    
    searchInput.addEventListener('keydown', (event) => {
      if (isFocused && event.key === 'Enter') {
        // Thực hiện hành động tìm kiếm ở đây
        const keyword = searchInput.value;
        console.log('Từ khóa tìm kiếm:', keyword);
        updateSearched(keyword)
        loadTask_and_event()
        // Thay thế dòng này bằng code để gửi yêu cầu tìm kiếm đến server hoặc thực hiện tìm kiếm trên client
      }
    });
}

//How to hiển thị keyword đc css
function updateSearched(keyword){
    for(let task of listTask_todo){
        if(task.name.search(keyword) != -1 || task.description.search(keyword) != -1 || task.type.search(keyword) != -1 ){
            task.searched = "yes";
        }
        else{
            task.searched = "no";
        }
    }
    for(let task of listTask_done){
        if(task.name.search(keyword) != -1 || task.description.search(keyword) != -1 || task.type.search(keyword) != -1 ){
            task.searched = "yes";
        }
        else{
            task.searched = "no";
        }
    }
    for(let task of listTask_missed){
        if(task.name.search(keyword) != -1 || task.description.search(keyword) != -1 || task.type.search(keyword) != -1 ){
            task.searched = "yes";
        }
        else{
            task.searched = "no";
        }
    }
}

export function createEventReloadSearched(){
    const reloadSearchedBtn = document.getElementById('reloadSearched');
    reloadSearchedBtn.addEventListener("click", function(){
        for(let task of listTask_todo){
            task.searched = "yes";
        }
        for(let task of listTask_done){
            task.searched = "yes";
        }
        for(let task of listTask_missed){
            task.searched = "yes";
        }
        loadTask_and_event("noReload")
    })
}
