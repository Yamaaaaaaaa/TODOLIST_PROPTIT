
export let listTask_todo = [];
export let listTask_done = [];
export let listTask_missed = [];

// listTask_todo.unshift({
//     id: "a",
//     priority: "Cần Làm",
//     name: 'Đi ngủ 1',
//     description: 'Lên giường lúc 12h, dậy lúc 7h sáng',
//     deadline: '2024-21-12',
//     deadline_time: '23:00',
//     type: 'Định hướng cuộc đời',
//     timeleft: '00:00',
//     searched: "yes"
// })
// listTask_todo.unshift({
//     id: "b",
//     priority: "Cần Làm",
//     name: 'Tk này bị chuyển sang MISSED(Quá hạn)',
//     deadline: '2024-09-10',
//     deadline_time: '23:00',
//     description: 'Sáng mai học Java 7hhhhhhh',
//     type: 'Học tập và làm việc',
//     timeleft: '00:00',
//     searched: "yes"
// })
// listTask_todo.unshift({
//     id: "b",
//     priority: "Cần Làm",
//     name: 'Tk này sẽ Giữ ở TODO(Chưa đến hạn)',
//     deadline: '2024-12-31',
//     deadline_time: '23:00',
//     description: 'Sáng mai học Java 7hhhhhhh',
//     type: 'Học tập và làm việc',
//     timeleft: '00:00',
//     searched: "yes"

// })


// listTask_done.unshift({
//     id: "x",
//     priority: "Đã Hoàn Thành",
//     name: 'Đi học 0',
//     description: 'Lên giường lúc 12h, dậy lúc 7h sáng',
//     deadline: '2024-09-10',
//     deadline_time: '23:00',
//     type: 'Định hướng cuộc đời',
//     timeleft: '00:00',
//     searched: "yes"
// })

// listTask_missed.unshift({
//     id: "y",
//     priority: "Đã bỏ qua",
//     name: 'Đi học tiếng anh',
//     description: '9h sáng mai',
//     deadline: '2024-09-04',
//     deadline_time: '23:00',
//     type: 'Định hướng cuộc đời',
//     timeleft: '24-00',
//     searched: "yes"
// })
 




//2. Time:
let currentTime = new Date();
export function updateTimeforTask(){
    let s1 = currentTime.getFullYear().toString().padStart(2, '0') + '-' + ((currentTime.getMonth() + 1).toString().padStart(2, '0')) + '-' + currentTime.getDate().toString().padStart(2, '0');
    let id = 0;
   // console.log(s1)
    while(id < listTask_todo.length){
     //   console.log("s1: ", s1, "timeleft: ", listTask_todo[id].deadline, " ", listTask_todo[id].deadline > s1)
        if(listTask_todo[id].deadline < s1){
            listTask_todo[id].priority = "Đã bỏ qua"
            listTask_missed.unshift(listTask_todo[id])
            listTask_todo.splice(id, 1)
        }
        else id++;
    }
}

export function updateTimeleft(){
    const task_item = document.querySelectorAll(".task-item")
    for(let item of task_item){
        let res = ""
        const dateString = item.childNodes[9].innerText;
        const timeString = item.childNodes[11].innerText;

        const dateParts = dateString.split('-');
        const timeParts = timeString.split(':');

        // Gán các phần vào biến
        const day_Deadline = parseInt(dateParts[2]);
        const month_Deadline = parseInt(dateParts[1]);
        const year_Deadline = parseInt(dateParts[0]);
        const hour_Deadline = parseInt(timeParts[0]);
        const minute_Deadline = parseInt(timeParts[1]); 

        let hours = currentTime.getHours();
        let minutes = currentTime.getMinutes();
        let seconds = currentTime.getSeconds();
        let day = currentTime.getDate();
        let month = (currentTime.getMonth() + 1);
        let year = currentTime.getFullYear();

        //Nếu mà kém ngày, tháng, năm thì mới update, không thì thôi, viết ở dạng : "~~:~~"
        if(year_Deadline == year && month_Deadline == month && day_Deadline == day && (hour_Deadline > hours ||  (hour_Deadline == hours && minute_Deadline > minutes))){
            let s = (hour_Deadline - hours) * 60 * 60 + (minute_Deadline + 60 - minutes) * 60;
            let h = parseInt(s / 3600);
            s %= 3600;
            let m = parseInt(s / 60);
            s %= 60;
            res = h.toString().padStart(2, '0') + ":" + m.toString().padStart(2, '0') + ":" + s.toString().padStart(2, '0')
            // Đang bị 1 cái là: Thời gian nhập vào ko có giây :vvv
        }
        else{
            res = "Chill";
        }
        item.childNodes[17].childNodes[5].innerText = res;
    }  
}