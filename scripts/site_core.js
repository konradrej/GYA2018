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

var $notificationHolder = $("div#notifications-holder");
function sendNotification(message, type){
    if($notificationHolder.children().length >= 2){
        $notificationHolder.children().first().remove();
    }
    $('<div class="notification '+type+'">'+message+'</div>').appendTo($notificationHolder).delay(2000).fadeOut(500);
}