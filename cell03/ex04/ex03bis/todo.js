$(document).ready(function() {
    loadTasks();

    $('#new_task').click(function() {
        let task = prompt('Enter a new task:');
        if (task) {
            addTask(task);
            saveTasks();
        }
    });

    function addTask(task) {
        let taskDiv = $('<div></div>').addClass('todo-item').text(task);
        $('#ft_list').append(taskDiv);

        taskDiv.click(function() {
            if (confirm('Do you want to remove this task?')) {
                $(this).remove();
                saveTasks();
            }
        });
    }

    function saveTasks() {
        let tasks = [];
        $('.todo-item').each(function() {
            tasks.push($(this).text());
        });
        // Encode the tasks array to a string and save it as a cookie
        document.cookie = "tasks=" + encodeURIComponent(JSON.stringify(tasks)) + ";path=/";
    }

    function loadTasks() {
        let tasksCookie = getCookie('tasks');
        if (tasksCookie) {
            let tasks = JSON.parse(decodeURIComponent(tasksCookie));
            tasks.forEach(task => addTask(task));
        }
    }

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