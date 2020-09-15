// scroll up
document.getElementById("go-top").addEventListener("click", scrollUp);

function scrollUp(){
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

    if(currentScroll > 0){
        window.requestAnimationFrame(scrollUp);
        window.scrollTo (0, currentScroll -(currentScroll / 20));
        buttonUp.style.transform = "scale(0)";
    }
}

buttonUp = document.getElementById("go-top");

window.onscroll = function(){
    var scroll = document.documentElement.scrollTop;

    if (scroll > 400){
        buttonUp.style.transform = "scale(1)";
    }else if(scroll < 400){
        buttonUp.style.transform = "scale(0)";
    }
}
// scroll up

$(document).ready(function(){
    $(window).scroll(function(){
        if ($(this).scrollTop() > 0) {
            $('nav').addClass('nav2');
        }else{
            $('nav').removeClass('nav2');
        }
    });
});




