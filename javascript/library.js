// When a book or login/sign up is clicked on, show the popup for it, dim the books and the background, and turn off pointer-events for all books
function showPopup(id) {
    document.getElementById(id).style.display = "block";
    document.body.style.background = "rgba(0, 0, 0, 0.5)";
    document.getElementById('bg-image').style.filter= "brightness(50%)";
    document.querySelector(".books img").style.filter = "brightness(50%)";
    document.querySelector(".books").style.pointerEvents = "none";
}

// When the x is clicked, close the popup, return the background and images to normal, and allow books to be clicked again
function closePopup(id) {
    document.getElementById(id).style.display = "none";
    document.body.style.background = "#f5f3ff";
    document.getElementById('bg-image').style.filter= "brightness(100%)";
    document.querySelector(".books img").style.filter = "brightness(100%)";
    document.querySelector(".books").style.pointerEvents = "all";
}

// Return to home page when clicked
function home() {
    window.location.href = '/';
}