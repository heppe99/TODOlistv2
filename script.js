var EventHandlers = (function () {



    function init() {

        //get the input values and set them to local storage
        $("#add-button").click(function () {

            const title = $("#title").val();
            const description = $("#description").val();

            // Execute this condition if true ( means write some text in both fields)
            // If false (means no inputs) so do nothing
            if (title && description) {

                DocumentEdit.setToDoToContainer(title, description);
                ToDoStorage.setTodo(title, description);


                location.reload();  // refresh the page
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
    function setToDoToContainer(textTitle, textDesc, index) {

        let deleteButton = "<button class=\"deleteButton\" id=\"" + index + "\" >✘</button>";
        let completeButton = "<button class=\"completeButton\" id=\"" + (index * 1000) + "\" >✔</button>";

        $("#item-container").append("<div class=\"item\">"
            + "<h3 id=\"" + index * 100 + "\" >" + 'Title:' + "</h3>" + "<p>" + textTitle + "</p>"
            + "<h3 id=\"" + index * 100 + "\" >" + 'Description:' + "</h3>" + "<p>" + textDesc + "</p>"
            + "<li id=\"" + index * 100 + "\" >" + deleteButton + completeButton + "</li>" + "</div>");
    }


    // function deleteToDoFromContainer(index) {

    //     $("#" + index).remove();
    // }


    // function markTodoAsComplete(index) {
    //     $('#' + index).css({ 'text-decoration-line': 'line-through' })
    // }


    return {
        setToDoToContainer,
        // deleteToDoFromContainer,
        // markTodoAsComplete
    }

})();



var ToDoStorage = (function () {

    //initialize an empty list of todo-s
    var todoList = [];


    //Gets all todo-s from local Storage to userList
    function getTodo() {
        const listTodo = localStorage.getItem("TodoList");
        todoList = JSON.parse(listTodo);

        if (todoList === null) {
            todoList = [];
        }
        else if (todoList !== null) {

            for (const i in todoList) {


                console.log(todoList[i])  // -- test to the console we can get todo-list
                // -- Then  We have print this values to DOM

            }

        }

    }


    //Saves new todo in LocalStorage
    function setTodo(title, description) {

        //Sets the max id 
        let maxId = 0;
        for (const i in todoList) {
            const todo = todoList[i];
            if (todo.id > maxId) {
                maxId = todo.id;
            }
        }

        // Create todo object 
        const todo = {
            id: maxId + 1,
            title: title,
            description: description,
        };

        todoList.push(todo);
        saveChangesToLocalStorage();
    }

    //Saves changes to local storage
    function saveChangesToLocalStorage() {
        const todoLists = JSON.stringify(todoList);
        localStorage.setItem("TodoList", todoLists);
    }

    //removes tod's
    function removeTodo(id) {
        for (const i in todoList) {
            const todo = todoList[i];
            if (todo.id === id) {

                todoList.splice(i, 1);
                break;
            }
        }
        saveChangesToLocalStorage();
    }


    return {
        getTodo,
        setTodo,
        removeTodo,
        saveChangesToLocalStorage
    }


})();


$(document).ready(function () {
    EventHandlers.init();
    ToDoStorage.getTodo();
});