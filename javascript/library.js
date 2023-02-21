// When a book or login/sign up is clicked on, show the popup for it, dim the books and the background, and turn off pointer-events for all books
function showPopup(id) {
    document.getElementById(id).style.display = "block";
    document.body.style.background = "linear-gradient(180deg, rgba(0,0,0,0.25) 25%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.75) 90%)";
    document.body.style.backgroundAttachment = "fixed";
    // document.body.style.filter = "brightness(50%)";
    document.querySelector(".books").style.filter = "brightness(50%)";
    document.querySelector(".books").style.pointerEvents = "none";
    document.getElementById("heading-wrapper").style.filter = "brightness(50%)";
    document.getElementById("nav").style.filter = "brightness(50%)";
}

// When the x is clicked, close the popup, return the background and images to normal, and allow books to be clicked again
function closePopup(id) {
    document.getElementById(id).style.display = "none";
    document.body.style.background = "linear-gradient(180deg, rgba(245,243,255,1) 25%, rgba(184,175,255,1) 60%, rgba(90,74,227,1) 90%)";
    document.body.style.backgroundAttachment = "fixed";
    document.querySelector(".books").style.filter = "brightness(100%)";
    document.querySelector(".books").style.pointerEvents = "all";
    document.getElementById("heading-wrapper").style.filter = "brightness(100%)";
    document.getElementById("nav").style.filter = "brightness(100%)";
}