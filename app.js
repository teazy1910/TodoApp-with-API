const submitBtn = document.querySelector("#addBtn");
const removeBtn = document.querySelector("#removeBtn");
const input = document.querySelector("#inputField");
const todoList = document.querySelector("#list");

let todos = [];

function loadTodos() {
  fetch("http://localhost:4730/todos")
    .then((res) => res.json())
    .then((todosFromApi) => {
      todos = todosFromApi;
      renderTodos();
    });
}

// function to render todos from the backend to browser
function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const newLi = document.createElement("li");
    const text = document.createTextNode(todo.description);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    newLi.appendChild(checkbox);

    newLi.appendChild(text);
    todoList.appendChild(newLi);
  });
}
// klick button, new todo ans backend posten,
// response successful -> rendern
submitBtn.addEventListener("click", () => {
  const todoText = input.value;
  const newTodo = {
    description: todoText,
    done: false,
  };

  fetch("http://localhost:4730/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  })
    .then((res) => res.json())
    .then((newTodoFromApi) => {
      todos.push(newTodoFromApi);
      renderTodos();
    });
});

loadTodos();
