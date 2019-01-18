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

var currentView = 1;
function viewTransition(target){
	$("#view-"+currentView).fadeOut(500, function(){
		$("#view-"+target).fadeIn(500);
	});

	currentView = target;
}

$("form#view-1-form").submit(function(e){
	e.preventDefault();

	viewTransition(2);

	var size = $("input#view-1-gridsize").val();
	var playername = $("input#view-1-playername").val();

	startGame(size, playername);

	return false;
});