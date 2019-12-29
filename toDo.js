const toDoform = document.querySelector(".js-toDoForm");
const toDoinput = toDoform.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
const TODOS_LS = "toDos";

let toDos = [];

function deleteTodo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const div = li.parentNode;
    
    div.removeChild(li);
    toDoList.removeChild(div);
    const cleanToDos = toDos.filter(function (toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveTodos();
}

function saveTodos () {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function addingToDo (text) {
    const div = document.createElement("div");
    div.id = "tododiv";
    const li = document.createElement("li");
    const delBtn = document.createElement("div");
    delBtn.classList.add("delBtn");
    const imo = document.createElement("i");
    imo.classList.add("far");
    imo.classList.add("fa-calendar-times");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.addEventListener("click", deleteTodo);
    span.innerHTML = text;

    
    toDoList.appendChild(div);
    div.appendChild(li);
    li.appendChild(delBtn);
    delBtn.appendChild(imo);
    li.appendChild(span);
    li.id = newId;

    const toDoObj = {
        text: text,
        id: newId
    }
    toDos.push(toDoObj);
    saveTodos();
}

function toDoSubmit (event) {
    event.preventDefault();
    const currentValue = toDoinput.value;
    addingToDo(currentValue);
    toDoinput.value = "";
}

function loadToDolist() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo){
            addingToDo(toDo.text);
        })
            
        }
    
}


function init () {
    loadToDolist();
    toDoform.addEventListener("submit", toDoSubmit);
}
init()