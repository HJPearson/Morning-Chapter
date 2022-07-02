// Function from https://stackoverflow.com/questions/55442477/make-text-appear-disappear-on-button-click

var active = [];
function select(c1, c2, bookName) {
    if (active[0] == c1) {
        var bookTitle = document.querySelector(".title");
        bookTitle.innerHTML = "Receive a daily Morning Chapter for <u>_____<u>";

        document.querySelector(c1).style.display = "none";
        document.querySelector(c2).style.display = "none";

        active = [];
    }
    else if (active.length != 0) {
        document.querySelector(active[0]).style.display = "none";
        document.querySelector(active[1]).style.display = "none";

        var bookTitle = document.querySelector(".title");
        bookTitle.innerHTML = "Receive a daily Morning Chapter for <u>" + bookName + "<u>";

        document.querySelector(c1).style.display = "flex";
        document.querySelector(c2).style.display = "flex";

        active = [c1, c2];
    }

    else {
        var bookTitle = document.querySelector(".title");
        bookTitle.innerHTML = "Receive a daily Morning Chapter for <u>" + bookName + "<u>";

        document.querySelector(c1).style.display = "flex";
        document.querySelector(c2).style.display = "flex";

        active = [c1, c2];
    }
}
