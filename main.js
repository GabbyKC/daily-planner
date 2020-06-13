$(document).ready(function () {
    // Add Task Event
    $('#add-task-form').on('submit', function (e) {
        addTask(e);
    });

    // Edit Task Event
    $('#edit-task-form').on('submit', function (e) {
        updateTask(e);
    })

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

    // function to update task
    function updateTask(e) {
        let id = $('#task_id').val();
        let task = $('#task').val();
        let taskPriority = $('#priority').val();
        let taskDate = $('#date').val();
        let taskTime = $('#time').val();

        let taskList = JSON.parse(localStorage.getItem("tasks"));

        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].id == id) {
                taskList.splice(i, 1);
            }
            localStorage.setItem("tasks", JSON.stringify(taskList));
        }

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

// function for getting a single task
function getTask() {
    let $_GET = getQueryParams(document.location.search);
    let id = $_GET["id"];

    let taskList = JSON.parse(localStorage.getItem("tasks"))

    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            $('#edit-task-form #task_id').val(taskList[i].id);
            $('#edit-task-form #task').val(taskList[i].task);
            $('#edit-task-form #priority').val(taskList[i].task_priority);
            $('#edit-task-form #date').val(taskList[i].task_date);
            $('#edit-task-form #time').val(taskList[i].task_time);
        }
    }
}

// function to get HTTP get requests
function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    let params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }
    return params;
}