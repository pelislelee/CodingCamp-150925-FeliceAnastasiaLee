let todos = [];

function addTodo() {
    const todoInput = document.getElementById("todo-input");
    const todoDate = document.getElementById("todo-date");

    if (validateInput(todoInput.value, todoDate.value)) {
        console.log("Hello World")
    }
}

function displayTodos() {

}

function deleteTodo() {

}

function filterTodo() {

}

function validateInput(todo, date) {
    if (todo === "" || date === "") {
        alert("Please fill in both fields.");
        return false;
    }
    return true;
}