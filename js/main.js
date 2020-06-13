$(document).ready(function () {
    displayTasks();

    // remove task event
    $("#tasks").on("click", "#remove-task", function () {
        let id = $(this).data("id");
        removeTask(id);
    });

    // clear tasks event
    $("#clear_tasks").on("click", function () {
        clearAllTasks();
    });

    // function to display tasks
    function displayTasks() {
        let taskList = JSON.parse(localStorage.getItem("tasks"));

        // sort tasks
        if (taskList !== null) {
            taskList = taskList.sort(sortByTime);
        }

        function sortByTime(a, b) {
            let aTime = a.task_date;
            let bTime = b.task_date;

            return ((aTime < bTime) ? -1 : ((aTime > bTime) ? 1 : 0));
        }

        if (localStorage.getItem("tasks") !== null) {
            // loop through and display
            $.each(taskList, function (key, value) {
                $("#task-body").append(
                    '<tr id="value.id">' +
                    '<td>' + value.task + '</td>' +
                    '<td>' + value.task_priority + '</td>' +
                    '<td>' + value.task_date + '</td>' +
                    '<td>' + value.task_time + '</td>' +
                    '<td><a href="edit.html?id='+ value.id +'">Edit</a> | <a href="#" id="remove-task" data-id="'+ value.id +'">Remove</a></td>' +
                    '</tr>')
            })
        } else {
            $('#tasks').css("display", "none");
            $('#clear_tasks').css("display", "none");
            $('#add_tasks').css("display", "none");
            $("main").append(
                '<h5 class="mt-5">' + "No Tasks Added Yet..." + '</h5>' +
                '<p><a href="add.html" class="btn btn-info">Add Task</a></p>');
        }
    }

    // function to remove a task
    function removeTask(id) {
        if (confirm("Are you sure you want to delete this task?")) {
            let taskList = JSON.parse(localStorage.getItem("tasks"));

            for (let i = 0; i < taskList.length; i++) {
                if (taskList[i].id == id) {
                    taskList.splice(i, 1);
                }
                localStorage.setItem("tasks", JSON.stringify(taskList));

                if (taskList.length === 0) {
                    localStorage.clear();
                }
                location.reload()
            }
        }
    }
    // function to remove all tasks
    function clearAllTasks() {
        if (confirm("Do you want to clear all tasks?")) {
            localStorage.clear();
            location.reload();
        }
    }
});