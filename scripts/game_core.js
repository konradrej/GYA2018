var shipType = {
	CARRIER: 5,
	BATTLESHIP: 4,
	CRUISER: 3,
	SUBMARINE: 2,
	DESTROYER: 1,
	NONE: 0
};

class ai {
	constructor(){

	}

	generateRandomNumber(min, max, availableNumbers){
		if(typeof availableNumbers === "undefined"){
			return Math.round(Math.random() * (max-min) + min);
		}else{
			var number;

			do {
				number = Math.round(Math.random() * (max-min) + min);
			}while(!availableNumbers.includes(number));

			return number;
		}
	}

	placeShips(){
		var availableShips = [shipType.CARRIER, shipType.BATTLESHIP, shipType.CRUISER, shipType.SUBMARINE, shipType.DESTROYER];

		while(availableShips.length != 0){
			var currentSelectedShip = availableShips[0];

			var created = false;
			do {
				if(p2.createShip(
								currentSelectedShip,
								this.generateRandomNumber(0, 1),
								this.generateRandomNumber(0, p2.size-1),
								this.generateRandomNumber(0, p2.size-1)
				)){
					availableShips.shift();
					created = true;
				}
			}while(!created);
		}
	}

	guessSquare(){
		var result;

		do {
			result = p1.checkTileHit(
									this.generateRandomNumber(0, p1.size-1),
									this.generateRandomNumber(0, p1.size-1)
			);
		}while(result.wasHit);

		if(result.shipHit){
			currentGame.printAction(p2.playername+" prickade ett skepp.");
			return true;
		}else{
			currentGame.printAction(p2.playername+" missade.");
			return false;
		}
	}

	playSquare(){
		var shipHit = false;

		do {
			shipHit = this.guessSquare();

			if(p1.ships.amount == 0){
				checkGameOver();
				break;
			}
		}while(shipHit);
	}
}

class player {
	constructor(size, playername){
		if(typeof playername == "undefined"){
			playername = "Dator";
			this.isPlayer = false;
		}else{
			this.isPlayer = true;
		}

		this.shots = 0;
		this.hits = 0;

		this.size = size;
		this.playername = playername;
		this.generateGrid(size);
		this.shipsLeftToPlace = 5;
		this.ships = {
			CARRIER: 5,
			BATTLESHIP: 4,
			CRUISER: 3,
			SUBMARINE: 3,
			DESTROYER: 2,
			amount: 5
		};
	}

	generateGrid(size){
		this.grid = new Array(size);

		for(var y = 0; y < size; y++){
			this.grid[y] = new Array(size);

			for(var x = 0; x < size; x++){
				this.grid[y][x] = {isHit: false, isShip: shipType.NONE};
			}
		}
	}

	generateGridHTML(showShips){
		this.gridHTML = document.createElement("div");
		this.gridHTML.setAttribute("class", "game_grid size-"+this.size);

		this.guide = 'ABCDEFGHIJ';
		for(var y = -1; y < this.grid.length; y++){
			for(var x = -1; x < this.grid[0].length; x++){
				var gridSquare = document.createElement("div");

				if(y == -1){
					if(x != -1){
						gridSquare.innerHTML = this.guide.charAt(x);
						gridSquare.setAttribute("data-column", x);
					}

					gridSquare.setAttribute("class", "grid_guide");
				}else{
					if(x == -1){
						gridSquare.innerHTML = y+1;
						gridSquare.setAttribute("data-row", y);
						gridSquare.setAttribute("class", "grid_guide");
					}else{
						gridSquare.setAttribute("data-row", y);
						gridSquare.setAttribute("data-column", x);
						
						if(showShips){
							gridSquare.setAttribute("data-isShip", this.grid[x][y]['isShip']);
						}

						gridSquare.setAttribute("data-isHit", this.grid[x][y]['isHit']);
						gridSquare.setAttribute("class", "grid_square");

						if(this.isPlayer){
							gridSquare.setAttribute("data-playergrid", "true");
						}else{
							gridSquare.setAttribute("data-playergrid", "false");
						}
					}
				}

				this.gridHTML.appendChild(gridSquare);
			}
		}

		return this.gridHTML;
	}

	printHTML(container, showShips){
		if(typeof showShips === "undefined") {
			showShips = false;
		}

		document.getElementsByClassName(container)[0].appendChild(generateGridHTML(showShips));
	}

	//this.shots = times firing, this.hits = times hitting a ship 								// FIX
	checkTileHit(x, y){
		if(!this.grid[x][y]['isHit']){
			var didHit = false;
			this.grid[x][y]['isHit'] = true;

			switch(this.grid[x][y]['isShip']){
				case shipType.CARRIER:
					this.ships.CARRIER--;
					if(this.ships.CARRIER == 0){
						this.ships.amount--;
					}
					didHit = true;
					break;
				case shipType.BATTLESHIP:
					this.ships.BATTLESHIP--;
					if(this.ships.BATTLESHIP == 0){
						this.ships.amount--;
					}
					didHit = true;
					break;
				case shipType.CRUISER:
					this.ships.CRUISER--;
					if(this.ships.CRUISER == 0){
						this.ships.amount--;
					}
					didHit = true;
					break;
				case shipType.SUBMARINE:
					this.ships.SUBMARINE--;
					if(this.ships.SUBMARINE == 0){
						this.ships.amount--;
					}
					didHit = true;
					break;
				case shipType.DESTROYER:
					this.ships.DESTROYER--;
					if(this.ships.DESTROYER == 0){
						this.ships.amount--;
					}
					didHit = true;
					break;
			}

			if(this.isPlayer){
				$(".player-container div.grid_square[data-column='"+x+"'][data-row='"+y+"']").attr("data-isHit", "true");

				if(didHit){
					$(".player-container div.grid_square[data-column='"+x+"'][data-row='"+y+"']").attr("data-isShip", "true");
				}
			}else{
				$(".enemy-container div.grid_square[data-column='"+x+"'][data-row='"+y+"']").attr("data-isHit", "true");

				if(didHit){
					$(".enemy-container div.grid_square[data-column='"+x+"'][data-row='"+y+"']").attr("data-isShip", "true");
				}
			}

			if(this.isPlayer){
				p2.shots++;
				if(didHit){
					p2.hits++;
				}
			}else{
				p1.shots++;
				if(didHit){
					p1.hits++;
				}
			}

			return {
				wasHit: false,
				shipHit: didHit
			};
		}

		return {
			wasHit: true
		};
	}

	createShip(shipTypeID, isVertical, x, y){
		var ship = {};
			ship.ID = parseInt(shipTypeID);
			ship.isVertical = isVertical;
			ship.x = parseInt(x);
			ship.y = parseInt(y);

		switch(ship.ID){
			case shipType.CARRIER:
				ship.length = 5;
				ship.color = "purple";
				break;
			case shipType.BATTLESHIP:
				ship.length = 4;
				ship.color = "lightblue";
				break;
			case shipType.CRUISER:
				ship.length = 3;
				ship.color = "green";
				break;
			case shipType.SUBMARINE:
				ship.length = 3;
				ship.color = "yellow";
				break;
			case shipType.DESTROYER:
				ship.length = 2;
				ship.color = "orange";
				break;
			default:
				return false;
		}

		var isValid = this.validShipPosition(ship);
		if(isValid.empty){
			this.placeShip(ship, isValid.xPos, isValid.yPos);
			this.shipsLeftToPlace--;

			return true;
		}else{
			if(this.isPlayer){
				switch(isValid.reason){
					case 'ship':
						sendNotification('Skeppen kan inte placeras på varandra.', 'error');
						break;
					case 'outside':
						sendNotification('Placera skeppet inom spelplanen.', 'error');
						break;
				}
			}

			return false;
		}
	}

	validShipPosition(ship){
		var xPos = [],
			yPos = [];

		for(var i = 0; i < ship.length; i++){
			if(ship.isVertical){
				if(ship.y+i < this.size){
					if(this.grid[ship.x][ship.y+i]['isShip'] == shipType.NONE){
						xPos.push(ship.x);
						yPos.push(ship.y+i);
					}else{
						return {
							empty: false,
							x: ship.x,
							y: ship.y+i,
							reason: 'ship'
						};
					}
				}else{
					return {
						empty: false,
						x: ship.x,
						y: ship.y+i,
						reason: 'outside'
					};
				}
			}else{
				if(ship.x+i < this.size){
					if(this.grid[ship.x+i][ship.y]['isShip'] == shipType.NONE){
						xPos.push(ship.x+i);
						yPos.push(ship.y);
					}else{
						return {
							empty: false,
							x: ship.x+i,
							y: ship.y,
							reason: 'ship'
						};
					}
				}else{
					return {
						empty: false,
						x: ship.x+i,
						y: ship.y,
						reason: 'outside'
					};
				}
			}
		}

		return {
			empty: true,
			xPos: xPos,
			yPos: yPos
		};
	}

	placeShip(ship, xPos, yPos){
		for(var i = 0; i < ship.length; i++){
			this.grid[xPos[i]][yPos[i]]['isShip'] = ship.ID;

			if(this.isPlayer){
				$("section#view-2 div.grid_square[data-column='"+xPos[i]+"'][data-row='"+yPos[i]+"'][data-playergrid=true]").css("background", ship.color);
			}
		}
	}
}

class game {
	constructor(size, playername){
		p1 = new player(size, playername);
		p2 = new player(size);

		this.selectedShipID = shipType.NONE;
	}

	printBoard(shipPlacing){
		if(shipPlacing){
			$("section#view-2 div.grid").append(p1.generateGridHTML());
		}else{
			$("section#view-3 div.player-container").append(p1.generateGridHTML(true));
			$("section#view-3 div.enemy-container").append(p2.generateGridHTML(false));
		}
	}

	saveMatchData(){
		if(typeof(Storage) !== "undefined"){
			var matches = [];

			if(typeof(localStorage.matches) !== "undefined"){
				matches = JSON.parse(localStorage.matches);
			}

			var match = {};

			match.winner = currentGame.winner;
			match.p1 = {
				name: p1.playername,
				shots: p1.shots,
				hits: p1.hits,
				hitpercent: p1.hits/p1.shots
			};

			match.p2 = {
				name: p2.playername,
				shots: p2.shots,
				hits: p2.hits,
				hitpercent: p2.hits/p2.shots
			};

			matches.push(match);

			localStorage.matches = JSON.stringify(matches);
		}else{
			//Localstorage not available
			//inform user
			//infuture, offer to upload match stats
		}
	}

	getCurrentTime(){
		var currentDate = new Date();
		var difference = (currentDate.getTime() - this.timeStart.getTime()) / 1000;

		var date = new Date(null);
		date.setSeconds(difference);
		return date.toISOString().substr(14, 5);
	}

	printAction(message){
		$("section#view-3 div.actions-wrapper").append("<div><span class='time'>"+this.getCurrentTime()+"</span><span class='message'>"+message+"</span></div>");
		$("section#view-3 div.actions-wrapper").scrollTop($("section#view-3 div.actions-wrapper").prop("scrollHeight"));
	}
}

var currentGame, p1, p2;
function placeShips(size, playername){
	currentGame = new game(size, playername);

	currentGame.printBoard(true);
	currentGame.selectedShipVertical = true;

	var $placeShipGridSquare = $("section#view-2 div.grid div.grid_square");
	$placeShipGridSquare.click(function(){
		if(currentGame.selectedShipID == shipType.NONE){
			return;
		}

		if(p1.createShip(currentGame.selectedShipID, currentGame.selectedShipVertical, $(this).attr('data-column'), $(this).attr('data-row'))){
			$placeShipShipsContainer.removeClass("ship__active");
			$(".ship[data-ship-id='"+currentGame.selectedShipID+"']").unbind('click').children("div.ship__container").attr("data-amount", "0");
			currentGame.selectedShipID = shipType.NONE;
		}
	});

	var $placeShipShipsContainer = $(".ship");
	$placeShipShipsContainer.click(function(){
		$placeShipShipsContainer.removeClass("ship__active");
		$(this).addClass("ship__active");
		currentGame.selectedShipID = $(this).attr("data-ship-id");
	});

	$("section#view-2 button.rotate").click(function(){
		currentGame.selectedShipVertical = !currentGame.selectedShipVertical;
		$(this).text(currentGame.selectedShipVertical ? "Vertikal": "Horisontell");
	});
}

function gameLoop(){
	currentGame.playing = true;
	currentGame.timeStart = new Date();
	p2.ai = new ai();
	p2.ai.placeShips();

	$("section#view-3 div.actions-wrapper").append("<div><span class='time'>--:--</span><span class='message'>"+p1.playername+" placerade sina skepp.</span></div>");
	$("section#view-3 div.actions-wrapper").append("<div><span class='time'>--:--</span><span class='message'>"+p2.playername+" placerade sina skepp.</span></div>");

	currentGame.isAiTurn = !(Math.random()+.5|0);
	if(currentGame.isAiTurn){
		p2.ai.playSquare();
		currentGame.isAiTurn = false;
	}

	$("section#view-3 .enemy-container .grid_square").click(function(){
		if($(this).attr("data-isHit") == "true"){
			return;
		}else{
			if(!currentGame.isAiTurn){
				var x = $(this).attr("data-column"),
					y = $(this).attr("data-row");

				currentGame.printAction(p1.playername+" attackerade "+p1.guide.charAt(x)+(parseInt(y)+1));

				var result = p2.checkTileHit(x, y);
				if(result.shipHit){
					currentGame.isAiTurn = false;
					currentGame.printAction(p1.playername+" prickade ett skepp.");
				}else{
					currentGame.isAiTurn = true;
					currentGame.printAction(p1.playername+" missade.");
					p2.ai.playSquare();
					currentGame.isAiTurn = false;
				}
			}
		}

		checkGameOver();
	});
}

function checkGameOver(){
	if(p1.ships.amount == 0 || p2.ships.amount == 0){
		currentGame.playing = false;
		$(".enemy-container .grid_square").unbind();

		if(p1.ships.amount == 0){
			currentGame.winner = "player_2";
			currentGame.printAction(p2.playername+" vann.");
		}else if(p2.ships.amount == 0){
			currentGame.winner = "player_1";
			currentGame.printAction(p1.playername+" vann.");
		}

		gameOver();
		return true;
	}

	return false;
}

//inform about sinking a ship