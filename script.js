
var EventHandlers = (function () {

    // Create empty to do list 
    var todoList = [];


    function init() {

        //get the to do list from ls 
        todoList = ToDoStorage.getToDoList();

        // our add to do event
        $("#add-button").click(function () {

            // Store values input fiels into variables
            const title = $("#title").val();
            const description = $("#description").val();

            // Call additem function to add new to do to list
            ToDoListHandler.addItem(todoList, title, description);

            // Save the to do list in local storage 
            ToDoStorage.updateToDoList(todoList);

            //Make new to do visible 
            refresh();

        });

        //Handles deletebutton on each todo
        $(document).on('click', '.delete-button', function () {

            // delete from list
            ToDoListHandler.deleteItem(todoList, this.id);

            // This is not needed
            documentEdit.deleteLi(this.id * 100);

            ToDoStorage.updateToDoList(todoList);

            refresh();
        })
        //Handles complete button on each todo
        $(document).on('click', '.done-button', function () {
            //we need to match the id's correctly
            ToDoListHandler.markAsComplete(todoList, this.id / 1000);

            ToDoStorage.updateToDoList(todoList);

            refresh();
        })

    }

    //Refreshes the UL list
    function refresh() {
        $("#item-container").empty();

        for (const i in todoList) {

            // This needs a different string
            const todoItemInHtml = (todoList[i].title, todoList[i].description + " | Est. time: " + todoList[i].estimated + "h | Complete: " + todoList[i].completed)
            documentEdit.addLi(todoItemInHtml, i);
        }
    }

    return { init, refresh }

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

    //Marks an item as complete.
    function markAsComplete(todoList, index) {
        todoList[index].completed = true;

    }
    //Deletes an item from todo list.
    function deleteItem(todoList, index) {
        todoList.splice(index, 1);
    }
    //Gets an item from the todo list.
    function getItem(todoList, index) {
        itemToReturn = todoList[index];

        return itemToReturn;
    }

    //function that sort the to do-list

    return {
        addItem,
        deleteItem,
        markAsComplete,
        getItem
    }

})();

$(document).ready(function () {
    EventHandlers.init();
    UserStorage.init();

});