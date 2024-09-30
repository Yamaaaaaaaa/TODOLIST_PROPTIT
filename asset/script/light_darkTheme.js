
function creatEventLight_DarkMode(){
    let lightBTN = document.querySelector("#lightmode")
    let darkBTN = document.querySelector("#darkmode")

    lightBTN.addEventListener("click", (event) =>{
        changeTheme(1);
    })

    darkBTN.addEventListener("click", (event) =>{
        changeTheme(2);
    })
}

function changeTheme(lightORdark){ 
    console.log("oKE");
    
    if(lightORdark == 2){
        const roott = document.querySelector(":root")        
        roott.style.setProperty('--colorLight_one', '#232122');
        roott.style.setProperty('--colorLight_two', '#333333'); 
        roott.style.setProperty('--color-three_light_buttonDark', '#f2f2f2');
        roott.style.setProperty('--color-three_light_buttonLight', '#000000');
        roott.style.setProperty('--color-four_light_Text', '#FFFFFF');
    }
    else{
        const roott = document.querySelector(":root")
        roott.style.setProperty('--colorLight_one', '#FFFFFF');
        roott.style.setProperty('--colorLight_two', '#f2f2f2');
        roott.style.setProperty('--color-three_light_buttonDark', '#000000');
        roott.style.setProperty('--color-three_light_buttonLight', '#f2f2f2');
        roott.style.setProperty('--color-four_light_Text', '#000000');
    }
}

creatEventLight_DarkMode()
