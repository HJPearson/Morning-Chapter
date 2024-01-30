// Makes "Click here to sign up" diasppear after scrolling away from the very top of the page
$(function () {
    var $win = $(window);

    $win.scroll(function () {
        if ($win.scrollTop() != 0)
            $( "#link-div" ).fadeOut( "slow" );
        else if ($win.scrollTop() == 0) {
            $( "#link-div" ).fadeIn( "slow" );
        }
    });
});


function closeWelcome() {
    // window.location.href = "/";
    document.getElementById("welcome-container").style.display = "none";
}