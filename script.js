var EventHandlers = (function () {


    function init() {

        $("#add-button").click(function () {

            const title = $("#title").val();
            const description = $("#description").val();
            const inputTitle = `${title}`;
            const inputDescription = `${description}`;
            DocumentEdit.setListToContainer(inputTitle, inputDescription);

        });

    }

    return {
        init
    };


})();

var DocumentEdit = (function () {


    function setListToContainer(textTitle, textDesc, index) {
        let deleteButton = "<button class=\"deleteButton\" id=\"" + index + "\" >✘</button>";
        let completeButton = "<button class=\"completeButton\" id=\"" + (index * 1000) + "\" >✔</button>";
        $("#todoList").append("<h3 id=\"" + index * 100 + "\" >" + 'Title:' + "</h3>" + "<p>" + textTitle + "</p>")
            .append("<h3 id=\"" + index * 100 + "\" >" + 'Description:' + "</h3>" + "<p>" + textDesc + "</p>")
            .append("<li id=\"" + index * 100 + "\" >" + deleteButton + completeButton + "</li>");

    }

    return {
        setListToContainer
    }

})();




$(document).ready(function () {
    EventHandlers.init();
});