$(document).ready(function () {
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
                $("#task-body").append(
                    '<tr id="value.id">' +
                    '<td>' + value.task + '</td>' +
                    '<td>' + value.task_priority + '</td>' +
                    '<td>' + value.task_date + '</td>' +
                    '<td>' + value.task_time + '</td>' +
                    '<td><a href="edit.html?id='+ value.id +'">Edit</a> | <a href="#" id="remove-task">Remove</a></td>' +
                    '</tr>')
            })
        } else {
            $('#tasks').css("display", "none");
            $('#clear_tasks').css("display", "none");
            $("main").append(
                '<h5 class="mt-5">' + "No Tasks Added Yet..." + '</h5>' +
                '<p><a href="add.html" class="btn btn-info">Add Task</a></p>');
        }
    }
});