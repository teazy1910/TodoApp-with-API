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
    checkbox.id = todo.id;
    checkbox.checked = todo.done;

    newLi.append(checkbox, text);

    todoList.appendChild(newLi);

    checkbox.addEventListener("change", update);
  });
}

// Filter Container
const todoFilter = document.querySelector(".filter-container");

// Filter Value für das gerade ausgewählte Element
const filterChecked = document.querySelector(
  "input[type='radio']:checked"
).value;

function todoIsChecked() {
  const checkedValues = document.querySelector(
    "input[type='checkbox']:checked"
  );
  for (let i = 0; i < checkedValues.length; i++) {
    console.log(checkedValues[i]);
  }
}

// gecheckte Todos iterieren
const checkedTodos = document.querySelector("input[type='checkbox']:checked");

for (let i = 0; i < checkedTodos.length; i++) {
  checkedValues[i];
}
// Filter auswählen (done, all, open)

function filterTodos() {
  if (filterValueChecked === "all") {
    return;
  } else if (filterValueChecked === "done") {
  }
}

/* 
Funktion für: 
- all, open, done => target?
- value der einzelnen filter
- anzeigen der jeweiligen todos



Funktion für:
- Auswahl checkbox
- checkbox gechecked?
ja? -> filter: Done + All
nein? -> filter: Open + All


*/

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
