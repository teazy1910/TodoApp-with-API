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
  todos.forEach(function (todo) {
    const newLi = document.createElement("li");

    const text = document.createTextNode(todo.description);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = todo.id;
    checkbox.checked = todo.done;

    newLi.append(checkbox, text);
    newLi.classList.add("todo-item");
    todoList.appendChild(newLi);

    if (todo.done === true) {
      newLi.classList.add("done");
      newLi.style.textDecoration = "line-through";
    }

    checkbox.addEventListener("change", update);
  });
}

// Filter Todos
function filterTodo(e) {
  const filteredTodos = [...todoList.children];
  filteredTodos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "";
        break;
      case "done":
        if (todo.classList.contains("done")) {
          todo.style.display = "";
        } else {
          todo.style.display = "none";
        }
        break;
      case "open":
        if (!todo.classList.contains("done")) {
          todo.style.display = "";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// DOM RadioButtons + Eventlistener
const radioBtns = document.querySelectorAll("input[type='radio']");
for (const radioBtn of radioBtns) {
  radioBtn.addEventListener("change", filterTodo);
}

// klick button, new todo ans backend,
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
  input.value = "";
  loadTodos();
});

function update(event) {
  const id = event.target.id;
  const updatedTodo = {
    description: event.target.parentNode.innerText,
    done: event.target.checked,
  };

  fetch("http://localhost:4730/todos/" + id, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(updatedTodo),
  })
    .then((res) => res.json())
    .then(() => {
      loadTodos();
    });
}

removeBtn.addEventListener("click", () => {
  // done todo aus der api laden -> löschen

  todos.forEach((todo) => {
    const currentId = todo.id;
    if (todo.done === true) {
      fetch("http://localhost:4730/todos/" + currentId, {
        method: "DELETE",
      })
        .then((res) => response.json(res))
        .then(() => {
          loadTodos();
        });
    }
  });
});

loadTodos();
