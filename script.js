
var ToDoStorage = (function () {

    //listan med todos
    var todos = JSON.parse(localStorage.getItem('todoLocalStorage')) || [];

    function init() {

        $("#add-button").click(function () {
            addItem();
        })
    }

    function getToDoList() {

    }

    function addItem() {

        const todo = {
            name: $("#title").val(),
            description: $("#description").val()
        };
        
        todos.push(todo);
        updateToDoList();
    }

    function removeStorage() {
        // localStorage.clear();
        localStorage.removeItem('todoLocalStorage');
    }

    function updateToDoList() {
        const listTodos = JSON.stringify(todos);
        localStorage.setItem('todoLocalStorage', listTodos);
    }

    return {
        init,
        getToDoList,
        addItem,
        updateToDoList,
        removeStorage
    }

})();

$(document).ready(function () {
    ToDoStorage.init();
});