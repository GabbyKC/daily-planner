$(document).ready(function () {
    $('#add-task-form').on('submit', function (e) {
        addTask(e);
    });

    displayTasks();

    // function to display tasks
    function displayTasks() {
        let taskList = JSON.parse(localStorage.getItem("tasks"));

        // sort tasks
        if (taskList !== null) {
            taskList = taskList.sort(sortByTime);
        }

        function sortByTime(a, b) {
            let aTime = a.task_time;
            let bTime = b.task_time;

            return ((aTime < bTime) ? -1 : ((aTime > bTime) ? 1 : 0));
        }

        if (localStorage.getItem("tasks") !== null) {
            // loop through and display
            $.each(taskList, function (key, value) {
                console.log(key + value.task)
                $("#task-table").append(
                    '<tr id="value.id">' +
                    '<td>' + value.task + '</td>' +
                    '<td>' + value.task_priority + '</td>' +
                    '<td>' + value.task_date + '</td>' +
                    '<td>' + value.task_time + '</td>' +
                    '<td><a href="edit.html?id='+value.id +'">Edit</a> | <a href="#" id="remove-task">Remove</a></td>' +
                    '</tr>')
            })
        }
    }

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