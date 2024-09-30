
//1. Hiển thị thời gian lên header:
let currentTime = new Date();
let headerTime = document.querySelector('#timeHeader')
let headerDate = document.querySelector('#dateHeader')

export function displayTime(){
    // Cập nhật các thuộc tính của đối tượng currentTime
    currentTime.setSeconds(currentTime.getSeconds() + 1);

    // Định dạng lại thời gian và hiển thị
    let hours = currentTime.getHours().toString().padStart(2, '0');
    let minutes = currentTime.getMinutes().toString().padStart(2, '0');
    let seconds = currentTime.getSeconds().toString().padStart(2, '0');
    let day = currentTime.getDate().toString().padStart(2, '0');
    let month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
    let year = currentTime.getFullYear().toString().padStart(2, '0');
    headerTime.textContent = `Time: ${hours}:${minutes}:${seconds}`;
    headerDate.textContent = `Date: ${day}/${month}/${year}`;
}

