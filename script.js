var EventHandlers = (function () {


    var todoList = [];
    let currentId = null;


    function init() {

        todoList = ToDoStorage.getToDoList();

         
        refresh();
        //get the input values and set them to local storage
        $("#add-button").click(function () {

            const title = $("#title").val();
            const description = $("#description").val();

            


            // Execute this condition if true ( means write some text in both fields)
            // If false (means no inputs) so do nothing
            if (title && description) {

                const index = todoList.length+1;
                //$(this).index();
                window.alert(index);   // to fix this 


                DocumentEdit.setToDoToContainer(title, description, index);
                ToDoStorage.setTodo(title, description);
                //refresh();
                //location.reload();  // refresh the page
            }

            $('#title').val('');
            $('#description').val('');
        });


        //Handles delete button on each todo
        $(document).on('click', '.deleteButton', function () {

            ToDoListHandler.deleteItem(todoList, this.id-1);
            
            console.log("DELETE item: " + this.id);
            /*
            DocumentEdit.deleteToDoFromContainer(this.id * 100);
            console.log("DELETE li: " + this.id * 100);
            */
           console.log(this.id);
 
           ToDoStorage.saveChangesToLocalStorage() 
           //ToDoStorage.updateTodo(this.id, todoList);
            refresh();
        })

        //Handles complete button on each todo
        $(document).on('click', '.completeBtn', function () {
            console.log("COMPLETE BUTTON :" + this.id);
            ToDoListHandler.markAsComplete(todoList, this.id / 1000);
            ToDoStorage.updateTodo(currentId, todoList);

            refresh();
        })
    }

    //Refreshes the UL list
    function refresh() {

       /*
        for (const i in todoList) {

            DocumentEdit.setToDoToContainer(title, description, i)
        }
        */
       $("#item-container").empty();
        for (var i = 0; i < todoList.length; i++)
        {
            DocumentEdit.setToDoToContainer(todoList[i].title, todoList[i].description, i+1)
        }

    }

    return {
        init,
        refresh
    };


})();


var DocumentEdit = (function () {



    //first add an item box to the big container and then append texts to it
    function setToDoToContainer(textTitle, textDesc, index) {

        let deleteButton = "<button class=\"deleteButton\" id=\"" + index + "\" >✘</button>";
        let completeButton = "<button class=\"completeButton\" id=\"" + index + "\" >✔</button>";
        
        $("#item-container").append("<div class=\"item id=\"" + index * 100 + "\">"
            + "<h3 id=\"" + index * 1000 + "\" >" + 'Title:' + "</h3>" + "<p>" + textTitle + "</p>"
            + "<h3 id=\"" + index * 1000 + "\" >" + 'Description:' + "</h3>" + "<p>" + textDesc + "</p>"
            + "<li id=\"" + index * 10000 + "\" >" + completeButton + deleteButton + "</li>" + "</div>");


    }


    function deleteToDoFromContainer(index) {

        $("#" + index).remove();

    }


    function markTodoAsComplete(index) {
        $('#' + index).css({ 'text-decoration-line': 'line-through' })
    }


    return {
        setToDoToContainer,
        deleteToDoFromContainer,
        markTodoAsComplete
    }

})();

var ToDoListHandler = (function () {


    //Adds an item to the todo list  
    function addItem(todoList, title, description) {

        // Every to do gets an id which we set to the length of the list 
        // so one index after the last index
        const todoId = todoList.length;
        const todo = {
            id: todoId,
            title: title,
            description: description,
            completed: false,
        }

        todoList.push(todo);

    }


    //Deletes an item from todo-list.
    function deleteItem(todoList, index) {
        todoList.splice(index, 1);
    }

    //Gets an item from the todo list.
    function getItem(todoList, index) {
        itemToReturn = todoList[index];

        return itemToReturn;
    }

    //Marks an item as complete.
    function markAsComplete(todoList, index) {
        todoList[index].completed = true;
    }

    return {
        addItem,
        markAsComplete,
        deleteItem,
        getItem
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
            completed: false,
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

    // important function .. 

    function getToDoList (){
        return todoList;
    }
    function updateTodo(id, updatedTodoList) {
        for (const i in todoList) {
            //Update if id is found
            if (todoList[i].id === id) {
                todoList[i].id = updatedTodoList;
            }
        }
        saveChangesUserList();
    }

    return {
        getTodo,
        setTodo,
        removeTodo,
        updateTodo,
        saveChangesToLocalStorage,
        getToDoList
    }


})();


$(document).ready(function () {
    ToDoStorage.getTodo();
    EventHandlers.init();
});