$(document).ready(function () {
    // Edit Task Event
    $('#edit-task-form').on('submit', function (e) {
        updateTask(e);
    })
});

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