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
	$('html,body').animate({
		scrollTop: 0
	}, 500);

	$("#view-"+currentView).fadeOut(500, function(){
		$("#view-"+target).fadeIn(500);
	});

	currentView = target;
}

//view 1 to view 2
$("form#view-1-form").submit(function(e){
	e.preventDefault();

	var size = $("input#view-1-gridsize").val(),
		playername = $("input#view-1-playername").val();

	if(size > 10 || size < 5 || size == ""){
		sendNotification("Var snäll och fyll in en siffra mellan 5 och 10 i forumläret.", "error");
	}else{
		if(playername == ""){
			sendNotification("Var snäll och fyll in ett namn i formuläret.", "error");
		}else{
			viewTransition(2);
			placeShips(size, playername);
		}
	}

	return false;
});

//view 2 to view 3
$("button#view-2-start").click(function(){
	if(p1.shipsLeftToPlace != 0){
		sendNotification("Placera alla skepp innan du startar spelet.", "error");

		return;
	}

	$("section#view-3 div.actions-wrapper").empty();
	currentGame.printBoard();
	viewTransition(3);
	$("span#view-3-playername").html(p1.playername);
	gameLoop();

	return false;
});

//view 3 to view 4
function gameOver(){
	if(currentGame.winner == "player_1"){
		$("#view-4 h2").html("Grattis "+p1.playername+", du vann!");
	}else if(currentGame.winner == "player_2"){
		$("#view-4 h2").html("Bättre lycka nästa gång!");
	}else{
		//error, no winner yet
		alert("error, winner");
	}

	$("div.name.player_1").html(p1.playername);
	$("div.name.player_2").html(p2.playername);
	$("div.accuracy.player_1").html(Math.round(p1.hits/p1.shots*100));
	$("div.accuracy.player_2").html(Math.round(p2.hits/p2.shots*100));

	$("#view-4").fadeIn(500);
}

$("form#view-4-form").submit(function(e){
	e.preventDefault();

	if($("#submit-stats").prop("checked")){
		currentGame.saveMatchData();
	}

	$("form#view-4-form").fadeOut(500, function(){
		$("#play-again").fadeIn(500);
	});

	return false;
});

//view 4 to view 1
$("#play-again").click(function(){
	currentGame = null;

	$("#view-4").fadeOut(500);
	location.reload();

	//doesnt properly reset view-2
});

if(typeof(Storage) !== "undefined" && typeof(localStorage.matches) !== "undefined"){
	var matches = JSON.parse(localStorage.matches);
	var $container = $("div#stats div.container");
	$container.empty();

	for(var i = 0; i < matches.length; i++){
		var match = '<div class="match '+matches[i].winner+'"><div class="match--id"><h3>Match #'+(i+1)+'</h3></div><div class="match--stats"><div class="static">Namn</div><div class="name player_1">'+matches[i].p1.name+'</div><div class="name player_2">'+matches[i].p2.name+'</div><div class="static">Träffar (%)</div><div class="accuracy player_1">'+Math.round((matches[i].p1.hitpercent*100))+'</div><div class="accuracy player_2">'+Math.round((matches[i].p2.hitpercent*100))+'</div></div></div>';

		$container.prepend(match);
	}
}

$('html,body').animate({
	scrollTop: 0
}, 500);