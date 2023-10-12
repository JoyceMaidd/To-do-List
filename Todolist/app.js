//selectors
const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-list');
const filterOption=document.querySelector('.todo-filter');

//Event listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',DeleteCheck);
filterOption.addEventListener('click',filterTodo);

//Functions
function addTodo(event){
    //prevent form from submitting
    event.preventDefault();
    //Todo Div
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo=document.createElement('li');
    newTodo.innerText=todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //add local storage
    saveLocalTodos(todoInput.value);
    //check button 
    const checkButton=document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add("check-btn");
    todoDiv.appendChild(checkButton);
    //delete button 
    const deleteButton=document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("trash-btn");
    todoDiv.appendChild(deleteButton);
    //Append to list
    todoList.appendChild(todoDiv)
    //clear todo input value
    todoInput.value="";
}

function DeleteCheck(e){ 
    const item=e.target;
    //delete todo
    if(item.classList[0]==='trash-btn'){
         const todo=item.parentElement;
         //Animation
         todo.classList.add('delete');
         removeLocalTodos(todo);
         todo.addEventListener('transitionend', function(){
            todo.remove();
         });
    }
    //Check mark
    if(item.classList[0]==='check-btn'){
        const todo=item.parentElement;
        todo.classList.toggle('Completed');
    }
}
function filterTodo(e){
    const todos=todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display='flex';
                break;
            case "completed":
                if(todo.classList.contains("Completed")){
                    todo.style.display = 'flex';
                }
                else{todo.style.display = "none";}
                break;
            case "uncompleted":
                if(!todo.classList.contains("Completed")){
                    todo.style.display = 'flex';
                }else{todo.style.display = "none";}
                break;
        }
    });
}

function saveLocalTodos(todo){
     let todos;
     if(localStorage.getItem('todos')===null){
        todos=[];
     }else{
        todos=JSON.parse(localStorage. getItem('todos'));
     }
     todos.push(todo);
     localStorage.setItem("todos",JSON.stringify(todos));
}
function getTodos(){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
     }else{
        todos=JSON.parse(localStorage. getItem('todos'));
     }
    todos.forEach(function(todo){
        //Todo Div
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo=document.createElement('li');
    newTodo.innerText=todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //check button 
    const checkButton=document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add("check-btn");
    todoDiv.appendChild(checkButton);
    //delete button 
    const deleteButton=document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("trash-btn");
    todoDiv.appendChild(deleteButton);
    //Append to list
    todoList.appendChild(todoDiv)
    })
}
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    const index = todos.indexOf(todoIndex);
    if (index !== -1) {
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}