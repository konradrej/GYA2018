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

//view 1 to view 2
$("form#view-1-form").submit(function(e){
	e.preventDefault();

	viewTransition(2);

	var size = $("input#view-1-gridsize").val();
	var playername = $("input#view-1-playername").val();

	placeShips(size, playername);

	return false;
});

//view 2 to view 3
$("button#view-2-start").click(function(){
	if(p1.shipsLeft != 0){
		sendNotification("Placera alla skepp innan du startar spelet.", "error");

		return;
	}

	viewTransition(3);

	$("span#view-3-playername").html(p1.playername);

	return false;
});

if(typeof(Storage) !== "undefined" && typeof(localStorage.matches) !== "undefined"){
	var matches = JSON.parse(localStorage.matches);
	var $container = $("div#stats div.container");

	for(var i = 0; i < matches.length; i++){
		var match = '<div class="match '+matches[i].winner+'"><div class="match--id"><h3>Match #'+(i+1)+'</h3></div><div class="match--stats"><div class="static">Namn</div><div class="name player_1">'+matches[i].p1.name+'</div><div class="name player_2">'+matches[i].p2.name+'</div><div class="static">Träffar (%)</div><div class="accuracy player_1">'+matches[i].p1.hitprocent+'</div><div class="accuracy player_2">'+matches[i].p2.hitprocent+'</div></div></div>';

		$container.empty();
		$container.prepend(match);
	}
}else{
	//local data/storage doesnt exists
}
















//Dev mode to choose a specific view and generate necessary markup
var devMode = false, devView = 3;
if(devMode){
	viewTransition(devView);

	var currentGame, p1, p2;
	currentGame = new game(10, "Dev");

	currentGame.printBoard();
}