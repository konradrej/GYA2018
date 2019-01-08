$("a[href*=\\#]:not([href=\\#])").click(function(){
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname){
        scrollToAnchor(this.hash);
    }
});

function scrollToAnchor(hash) {
    var target = $(hash);

    target = target.length ? target : $('[name=' + hash.slice(1) +']');

    if (target.length){
        $('html,body').animate({
            scrollTop: target.offset().top
        }, 500);
        return false;
    }
}

//if(window.location.hash){
//    scrollToAnchor(window.location.hash);
//}
