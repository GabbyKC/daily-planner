$(document).ready(function () {
    $('#add-task-form').on('submit', function (e) {
        addTask(e);
    });
    // function to add task
    function addTask(e) {
        // add unique id
        const newDate = new Date();
        const id = newDate.getTime();

        let task = $('#task').val();
        let taskPriority = $('#priority').val();
        let taskDate = $('#date').val();
        let taskTime = $('#time').val();

        // simple validation
        if (task === '') {
            alert("Task title is required");
            e.preventDefault();
        } else if (taskDate === '') {
            alert("Date is required");
            e.preventDefault();
        } else if (taskTime === '') {
            alert("Time is required");
            e.preventDefault();
        } else if (taskPriority === '') {
            taskPriority = "normal";
        } else {
            let tasks = JSON.parse(localStorage.getItem("tasks"));

            // check tasks
            if (tasks === null) {
                tasks = [];
            }

            let taskList = JSON.parse(localStorage.getItem("tasks"));

            // new task object
            let newTask = {
                "id": id,
                "task": task,
                "task_priority": taskPriority,
                "task_date": taskDate,
                "task_time": taskTime
            }

            tasks.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }
});