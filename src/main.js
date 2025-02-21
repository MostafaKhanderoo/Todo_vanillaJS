import './style.css';
const BASE_URL = "https://jsonplaceholder.typicode.com/todos";
const createTodo = document.querySelector("#createTodo");
const clearAllTodo = document.querySelector("#clearAllTodo");
const todoList = document.querySelector("#todoList");
const createText = document.querySelector("#createText");

let storedTodos = localStorage.getItem("todos");
let todos = storedTodos ? JSON.parse(storedTodos) : [];

renderTodos();

createTodo.addEventListener("click", async (e) => {
    e.preventDefault();
    createText.textContent = "create";

    const taskName = document.querySelector("#task-name").value.trim();
    const taskTitle = document.querySelector("#task-title").value.trim();


    if (!taskName || !taskTitle) {
        alert("Fill in both fields.");
        return;
    }
        
   
    const todoItem = { 
        id: crypto.randomUUID().substring(0,4), 
        taskName, 
        taskTitle,
        date: new Date().toISOString()
    };

    todos.push(todoItem);
    saveTodos();

  
    async function postTodo(todo) {
        try {
            const response = await fetch(BASE_URL, {  
                method: "POST",
                body: JSON.stringify(todo),
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const data = await response.json();
            
            if(data.userId) {
                localStorage.setItem("userId", data.userId);
            }
        } catch (error) {
            console.error("Error posting todo:", error);
        }
    }
    postTodo(todoItem);

    renderTodos();
    document.querySelector("#task-name").value = "";
    document.querySelector("#task-title").value = "";
}); 

function renderTodos() {
    todoList.innerHTML = ""; 

    todos.sort((a, b) => new Date(a.date) - new Date(b.date));

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
            saveTodos();
            renderTodos();
        });

        todoElement.querySelector(".editTodo").addEventListener("click", (e) => {
            const todoId = e.target.closest("button").dataset.id;
            createText.textContent = "Update";
            
            const task = todos.find(t => t.id === todoId);
            if (task) {
                document.querySelector("#task-name").value = task.taskName;
                document.querySelector("#task-title").value = task.taskTitle;
                todos = todos.filter(t => t.id !== todoId);
                saveTodos();
                renderTodos();
            }
        });
        
        todoList.appendChild(todoElement); 
    });
}

clearAllTodo.addEventListener("click", () => {
    todos = [];
    saveTodos();
    renderTodos();
});

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
