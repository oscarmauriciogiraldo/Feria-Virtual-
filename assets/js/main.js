$(document).ready(function(){
    $(window).scroll(function(){
        if ($(this).scrollTop() > 0) {
            $('nav').addClass('nav2');
        }else{
            $('nav').removeClass('nav2');
        }
    });
});

window.onscroll = function(){
    if (document.documentElement.scrollTop > 100) {
        document.querySelector('.go-top-container')
        .classList.add('show');        
    }else{
        document.querySelector('.go-top-container')
        .classList.remove('show');
    }
}

