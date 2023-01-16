const submitBtn = document.querySelector("#addBtn");
const removeBtn = document.querySelector("#removeBtn");
const input = document.querySelector("#inputField");
const todoList = document.querySelector("#list");

const filterDone = document.querySelector("#done");
const filterAll = document.querySelector("#all");
const filterOpen = document.querySelector("#open");

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

    if (todo.done === true) {
      input.checked = true;
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = todo.id;
    checkbox.checked = todo.done;

    newLi.append(checkbox, text);

    todoList.appendChild(newLi);

    checkbox.addEventListener("change", update);
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
