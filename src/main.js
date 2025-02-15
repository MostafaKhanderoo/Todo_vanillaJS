import './style.css';

const createTodo = document.querySelector("#createTodo");
const clearAllTodo = document.querySelector("#clearAllTodo");
const todoList = document.querySelector("#todoList");
const createText= document.querySelector("#createText");

let todos = [];

createTodo.addEventListener("click", (e) => {
    e.preventDefault();
    createText.textContent = "create";

    const taskName = document.querySelector("#task-name").value.trim();
    const taskTitle = document.querySelector("#task-title").value.trim();

    if (!taskName || !taskTitle) {
        alert("No No! enter both fields");
        return;
    }

    const todoItem = { 
        id: crypto.randomUUID().substring(0,4), 
        taskName, 
        taskTitle,
        date: new Date().toISOString()
    };

    todos.push(todoItem);
    renderTodos();
    document.querySelector("#task-name").value = "";
    document.querySelector("#task-title").value = "";
}); 

function renderTodos() {
    todoList.innerHTML = ""; 

    
    todos.sort((a, b) => new Date(b.date) - new Date(a.date));

    todos.forEach(todo => {
        const todoElement = document.createElement("div");
        todoElement.classList.add("bao", "flex", "flex-row", "justify-between", "mr-3.5", "mt-5", "ml-4", "rounded-3xl", "max-w-96", "w-full", "min-h-28");

        
  
        const todoDate = new Date(todo.date).toLocaleString();

        todoElement.innerHTML = `
            <div class="flex flex-col justify-around">
                <p class="flex text-amber-600 mx-5 text-xs">ID: ${todo.id} | ${todoDate}</p>
                <h2 class="ml-4 text-2xl text-white">${todo.taskName}</h2>
                <h2 class="ml-4 text-xl text-gray-400">${todo.taskTitle}</h2>
            </div>
            <div class="flex flex-row items-center">
                <button class="editTodo border-2 rounded-full hover:bg-blue-300 mr-4" data-id="${todo.id}">
                    <img src="src/assets/picture/icon3.png" alt="edit button">
                </button>
                <button class="deleteTodo border-2 rounded-full mr-4 hover:bg-red-400" data-id="${todo.id}">
              <img src="src/assets/picture/deleteicon.png" alt="delete icon">
                </button>
            </div>
        `;

        
        todoElement.querySelector(".deleteTodo").addEventListener("click", (e) => {
            const id = e.target.closest("button").dataset.id;
            todos = todos.filter(t => t.id !== id);
            renderTodos();
        });

    
        todoElement.querySelector(".editTodo").addEventListener("click", (e) => {

       
        createText.textContent = "Update";
        
        const id = e.target.closest("button").dataset.id;            const task = todos.find(t => t.id === id);

            if (task) {
               
      document.querySelector("#task-name").value = task.taskName;
               document.querySelector("#task-title").value = task.taskTitle;
          todos = todos.filter(t => t.id !== id);
     
       
                renderTodos();
                document.querySelector.id =this.id;
            }
           
        });
        
        todoList.appendChild(todoElement);
    });
}


clearAllTodo.addEventListener("click", () => {
    todos = [];
    renderTodos();
});
