const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const toDoS_LS = "toDos"
let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    todos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    // Turn JSON into string and save it.
    localStorage.setItem(toDoS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "☑️";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newID = toDos.length + 1;

    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newID;
    toDoList.appendChild(li);

    // push todo in array
    const toDoObj = {
        text: text,
        id: newID,
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const toDos = localStorage.getItem(toDoS_LS);
    if (toDos !== null){
        const parsedToDos = JSON.parse(toDos);
        parsedToDos.forEach(
            function(toDo){
                paintToDo(toDo.text);
            }
        )
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();

