// Function to get the cookie value by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Function to set a cookie
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = `expires=${d.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// Function to create a new To Do item
function createTodoItem(text) {
    const todoList = document.getElementById('ft_list');
    const todoDiv = document.createElement('div');
    todoDiv.className = 'todo-item';
    todoDiv.textContent = text;
    todoDiv.onclick = function() {
        if (confirm('Do you really want to delete this TO DO?')) {
            todoDiv.remove();
            saveTodos(); // Save the updated list after removal
        }
    };
    todoList.insertBefore(todoDiv, todoList.firstChild);
}

// Function to save To Do list to a cookie
function saveTodos() {
    const todos = Array.from(document.getElementById('ft_list').children)
        .map(todo => todo.textContent);
    setCookie('todos', JSON.stringify(todos), 7); // Save for 7 days
}

// Function to load To Do list from a cookie
function loadTodos() {
    const todos = JSON.parse(getCookie('todos') || '[]');
    todos.forEach(createTodoItem);
}

// Event listener for the New button
document.getElementById('newTodoButton').addEventListener('click', () => {
    const newTodo = prompt('Enter a new TO DO:');
    if (newTodo) {
        createTodoItem(newTodo);
        saveTodos(); // Save the new list after adding
    }
});

// Load To Do list when the page is loaded
window.onload = loadTodos;