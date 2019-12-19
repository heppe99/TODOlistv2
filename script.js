var EventHandlers = (function () {



    function init() {



        //get the input values and set them to local storage
        $("#add-button").click(function () {

            const title = $("#title").val();
            const description = $("#description").val();

            // Execute this condition if true ( means write some text in both fields)
            // If false (means no inputs) so do nothing
            if (title && description) {

                DocumentEdit.setToDoListToContainer(title, description);
                ToDoStorage.setTodo(title, description);

                // location.reload();  // refresh the page
            }

            $('#title').val('');
            $('#description').val('');
        });


    }

    return {
        init,

    };


})();



var DocumentEdit = (function () {

    //first add an item box to the big container and then append texts to it
    function setToDoListToContainer(textTitle, textDesc, index) {

        let deleteButton = "<button class=\"deleteButton\" id=\"" + index + "\" >✘</button>";
        let completeButton = "<button class=\"completeButton\" id=\"" + (index * 1000) + "\" >✔</button>";

        $("#item-container").append("<div class=\"item\">"
            + "<h3 id=\"" + index * 100 + "\" >" + 'Title:' + "</h3>" + "<p>" + textTitle + "</p>"
            + "<h3 id=\"" + index * 100 + "\" >" + 'Description:' + "</h3>" + "<p>" + textDesc + "</p>"
            + "<li id=\"" + index * 100 + "\" >" + deleteButton + completeButton + "</li>" + "</div>");
    }


    return {
        setToDoListToContainer
    }

})();




var ToDoStorage = (function () {

    //initialize an empty list of todo-s
    var todoList = [];


    //Saves new todo in LocalStorage
    function setTodo(title, description) {

        // Create todo object 
        const todo = {

            title: title,
            description: description,
        };

        todoList.unshift(todo);
        saveChangesToLocalStorage();
    }

    //Saves changes to local storage
    function saveChangesToLocalStorage() {
        const todoLists = JSON.stringify(todoList);
        localStorage.setItem("TodoList", todoLists);
    }


    return {

        setTodo,
        saveChangesToLocalStorage
    }


})();



$(document).ready(function () {
    EventHandlers.init();
});