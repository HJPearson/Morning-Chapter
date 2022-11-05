
var active = "";
function select(c, tag, title) {
    
    if (active != "") {
        document.querySelector(".overview").style.display = "block";
        document.getElementById(active).style.display = "none";

        document.getElementById(c).style.display = "block";

        document.getElementsByName("tags")[0].value = tag;

        var bookTitle = document.getElementById("book-title");
        bookTitle.innerHTML = title;

        active = c;
    }

    else {
        document.querySelector(".overview").style.display = "block";
        document.getElementById(c).style.display = "block";

        var bookTitle = document.getElementById("book-title");
        bookTitle.innerHTML = title;

        document.getElementsByName("tags")[0].value = tag;

        document.getElementById("mc-embedded-subscribe").disabled = false;
        
        active = c;
    }
}

function uncheckFunction() {
    let allRadioButtons = document.querySelectorAll('.radioButtons');
    allRadioButtons.forEach(value=> value.checked = false);

    document.getElementById(active).style.display = "none";

    document.getElementsByName("tags")[0].value = "";

    var bookTitle = document.getElementById("book-title");
    bookTitle.innerHTML = "...";

    document.getElementById("mc-embedded-subscribe").disabled = true;

    active = "";
}

// Close the modal window when you click anywhere outside of it
window.onclick = function(event) {
    var o = document.querySelector(".overview");
    var t = document.getElementById(active);
    // var close = document.querySelectorAll(".close");
    // var closeDiv = document.querySelectorAll(".close-div");
    // if (event.target == close[0] || event.target == close[1] || event.target == closeDiv[0] || event.target == closeDiv[1]) {
    //     t.style.display = "none";
    //     o.style.display = "none";
    // }

    // Deselects book when clicked in these divs
    if (active != "" && t.style.display == "none") {
        var x = document.querySelector(".featured-books");
        var y = document.getElementById("deselect");
        var z = document.getElementById("headsDiv");
        
        if (event.target == x || event.target == y || event.target == z) {
            uncheckFunction();
        }
    }
  }


  function closeOverview() {
    var o = document.querySelector(".overview");
    var t = document.getElementById(active);

    t.style.display = "none";
    o.style.display = "none";
  }



// function uncheckFunction() {
//     let allRadioButtons = document.querySelectorAll('.radioButtons');
//     allRadioButtons.forEach(value=> value.checked = false);

//     document.getElementById(active).style.display = "none";

//     document.getElementsByName("tags")[0].value = "";

//     var bookTitle = document.getElementById("book-title");
//     bookTitle.innerHTML = "...";

//     document.getElementById("mc-embedded-subscribe").disabled = true;

//     active = "";
// }
