// Aim: thu gọn hoặc hiển thị lại chi tiết các task.
let checkZoom = 1;

function setDisplay(elmDad, elmChild_List, elmProperty){
    for(const elm_child of elmChild_List){
        if(elmDad.contains(elm_child)){
            Object.assign(elm_child.style,{
                display: elmProperty
            })
        }
    }
}

export function details(taskstatus){
    const task_item = document.querySelectorAll('.task-item')
    const task_item_title = document.querySelectorAll('.task-item .item-title')
    const p_description = document.querySelectorAll('.task-item .p-item-description')
    const task_item_date = document.querySelectorAll('.task-item .item-date')
    const p_date = document.querySelectorAll('.task-item .p-item-date')
    const task_item_type = document.querySelectorAll('.task-item .item-type')
    const p_type = document.querySelectorAll('.task-item .p-item-type')
    const p_timeleft = document.querySelectorAll('.task-item .p-item-timeleft')


    for(const elm of task_item){
        if(elm.getAttribute("task-status") === taskstatus){
            setDisplay(elm, p_description, 'block')
            setDisplay(elm, task_item_date, 'block')
            setDisplay(elm, p_type, 'block')
            setDisplay(elm, p_date, 'block')
            setDisplay(elm, task_item_type, 'block')
            setDisplay(elm, p_timeleft, 'block')
        }
    }
}

export function reduce(taskstatus){
    const task_item = document.querySelectorAll('.task-item')
    const task_item_title = document.querySelectorAll('.task-item .item-title')
    const p_description = document.querySelectorAll('.task-item .p-item-description')
    const task_item_date = document.querySelectorAll('.task-item .item-date')
    const p_date = document.querySelectorAll('.task-item .p-item-date')
    const task_item_type = document.querySelectorAll('.task-item .item-type')
    const p_type = document.querySelectorAll('.task-item .p-item-type')
    const p_timeleft = document.querySelectorAll('.task-item .p-item-timeleft')


    for(const elm of task_item){
        if(elm.getAttribute("task-status") === taskstatus){          
            setDisplay(elm, p_description, 'none')
            setDisplay(elm, task_item_date, 'none')
            setDisplay(elm, p_type, 'none')
            setDisplay(elm, p_date, 'none')
            setDisplay(elm, task_item_type, 'none')
            setDisplay(elm, p_timeleft, 'inline')
        }
    }
}