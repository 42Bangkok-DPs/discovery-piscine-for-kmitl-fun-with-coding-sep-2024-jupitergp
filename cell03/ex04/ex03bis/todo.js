$(document).ready(function() {
    // Load tasks from cookie if available
    loadTasks();

    // Add new task on button click
    $('#new_task').click(function() {
        let task = prompt('Enter a new task:');
        if (task) {
            addTask(task);
            saveTasks();
        }
    });

    // Function to add task to the top of the list
    function addTask(task) {
        let taskDiv = $('<div></div>').addClass('todo-item').text(task);
        $('#ft_list').prepend(taskDiv);

        // Click event to remove task
        taskDiv.click(function() {
            if (confirm('Do you want to remove this task?')) {
                $(this).remove();
                saveTasks();
            }
        });
    }

    // Save tasks to cookies
    function saveTasks() {
        let tasks = [];
        $('.todo-item').each(function() {
            tasks.push($(this).text());
        });
        document.cookie = "tasks=" + JSON.stringify(tasks) + ";path=/";
    }

    // Load tasks from cookies
    function loadTasks() {
        let tasksCookie = getCookie('tasks');
        if (tasksCookie) {
            let tasks = JSON.parse(tasksCookie);
            tasks.forEach(task => addTask(task));
        }
    }

    // Helper function to get cookie by name
    function getCookie(name) {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                return cookie.substring((name + '=').length);
            }
        }
        return null;
    }
});
