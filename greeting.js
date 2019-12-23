const form = document.querySelector(".js-form"),
    input = form.querySelector("input");
    greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`
}


function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
            //유저가 있을 때
    } else {
        paintGreeting(currentUser);
            //유저가 없을 때
    }
}
 
    
function init(){
    loadName();
}

init();