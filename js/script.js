const form = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const filterSelect = document.getElementById("filter-select");
const deleteAllBtn = document.getElementById("delete-all");

let todos = [];

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const task = todoInput.value.trim();
  const date = dateInput.value;

  if (task === "" || date === "") {
    alert("Task dan Date harus diisi!");
    return;
  }

  const newTodo = {
    id: Date.now(),
    task: task,
    date: date,
    completed: false
  };

  todos.push(newTodo);
  renderTodos();
  form.reset();
});

function renderTodos(filter = filterSelect.value) {
  todoList.innerHTML = "";

  let filteredTodos = todos;
  if (filter === "active") {
    filteredTodos = todos.filter(todo => !todo.completed);
  } else if (filter === "completed") {
    filteredTodos = todos.filter(todo => todo.completed);
  }

  if (filteredTodos.length === 0) {
    todoList.innerHTML = `
      <tr>
        <td colspan="4" class="placeholder">No task found</td>
      </tr>`;
    return;
  }

  filteredTodos.forEach(todo => {
    const tr = document.createElement("tr");

    // Task
    const tdTask = document.createElement("td");
    tdTask.textContent = todo.task;

    // Date
    const tdDate = document.createElement("td");
    tdDate.textContent = todo.date;

    // Status
    const tdStatus = document.createElement("td");
    tdStatus.textContent = todo.completed ? "Completed" : "Active";
    tdStatus.className = "status " + (todo.completed ? "completed" : "active");

    // Actions
    const tdActions = document.createElement("td");

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = todo.completed ? "Mark Active" : "Mark Completed";
    toggleBtn.className = "action-btn toggle";
    toggleBtn.addEventListener("click", () => {
      todo.completed = !todo.completed;
      renderTodos(filter);
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "action-btn delete";
    delBtn.addEventListener("click", () => {
      todos = todos.filter(t => t.id !== todo.id);
      renderTodos(filter);
    });

    tdActions.appendChild(toggleBtn);
    tdActions.appendChild(delBtn);

    tr.appendChild(tdTask);
    tr.appendChild(tdDate);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);

    todoList.appendChild(tr);
  });
}

filterSelect.addEventListener("change", () => {
  renderTodos(filterSelect.value);
});

deleteAllBtn.addEventListener("click", () => {
  if (todos.length === 0) {
    alert("Tidak ada task untuk dihapus.");
    return;
  }
  if (confirm("Yakin ingin menghapus semua task?")) {
    todos = [];
    renderTodos();
  }
});

// render pertama
renderTodos();
