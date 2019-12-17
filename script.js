var documentEdit = (function () {




    function addTodoList(title, index) {

        btn = "<button class=\"deleteBtn\" id=\"" + index + "\" >✘</button>"
        completeButton = "<button class=\"completeBtn\" id=\"" + (index * 1000) + "\" >✔</button>"
        $("#todoList").append("<li id=\"" + index * 100 + "\" >" + text + btn + completeButton + historyBtn + "</li>");


    }
    function deleteLi(index) {
        console.log(index);

        $("#" + index).remove();

    }
    function markAsComplete(index) {
        $('#' + index).css({ 'text-decoration': 'line-through' })
    }

    function setUserTodo(amount) {
        $("#userTodos").text("Todos: " + amount);

    }


    return {

    }
})();

$(document).ready(function () {
    documentEdit.init();
});