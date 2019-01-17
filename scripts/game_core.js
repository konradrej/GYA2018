var shipType = {
	CARRIER: 5,
	BATTLESHIP: 4,
	CRUISER: 3,
	SUBMARINE: 2,
	DESTROYER: 1,
	NONE: 0
};

class player {
	constructor(size, playername){
		if(typeof playername == "undefined"){
			playername = "Dator";
		}

		this.size = size;
		this.score = 0;
		this.playername = playername;
		this.generateGrid(size);
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

	generateGridHTML(){
		this.gridHTML = document.createElement("div");
		this.gridHTML.setAttribute("class", "game_grid");

		var guide = 'ABCDEFGHIJ';
		for(var y = -1; y < this.grid.length; y++){
			for(var x = -1; x < this.grid[0].length; x++){
				var gridSquare = document.createElement("div");

				if(y == -1){
					if(x != -1){
						gridSquare.innerHTML = guide.charAt(x);
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
						gridSquare.setAttribute("class", "grid_square");
					}
				}

				this.gridHTML.appendChild(gridSquare);
			}
		}

		return this.gridHTML;
	}

	printHTML(container){
		document.getElementsByClassName(container)[0].appendChild(generateGridHTML());
	}

	// RETURNS FALSE IF IS ALREADY HIT
	// RETURNS TRUE IF

	// CREATE CHECKTILE AND ISHIT FUNCTIONS
	// CHECKTILE RETURNS TRUE IF IT ISNT HIT AND FALSE IF IT ALREADY IS HIT
	// ISHIT RETURNS TRUE IF A SHIP IS HIT ON TILE AND FLASE IF IT DIDNT HIT A SHIP

	//hitTile
	// if its already hit, return false
	// if it isnt hit, return true and mark hit and check if its a ship or not
	// if it is a ship, check if sunk







	//error ifall rutan är upptagen (kanske annat error ifall hamnar utanför)
	createShip(shipTypeID, isVertical, x, y){
		var ship = {};
			ship.ID = parseInt(shipTypeID);
			ship.isVertical = isVertical;
			ship.x = parseInt(x);
			ship.y = parseInt(y);

		switch(ship.ID){
			case shipType.CARRIER:
				ship.length = 5;
				ship.color = "lightblue";
				break;
			case shipType.BATTLESHIP:
				ship.length = 4;
				ship.color = "green";
				break;
			case shipType.CRUISER:
				ship.length = 3;
				ship.color = "yellow";
				break;
			case shipType.SUBMARINE:
				ship.length = 3;
				ship.color = "orange";
				break;
			case shipType.DESTROYER:
				ship.length = 2;
				ship.color = "red";
				break;
			default:
				return false;
		}

		var isValid = this.validShipPosition(ship);
		if(isValid.empty){
			this.placeShip(ship, isValid.xPos, isValid.yPos);

			return true;
		}else{
			// isValid.x, isValid.y is not available
			switch(isValid.reason){
				case 'ship':
					sendNotification('Skeppen kan inte placeras på varandra.', 'error');
					break;
				case 'outside':
					sendNotification('Placera skeppet inom spelplanen.', 'error');
					break;
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

			$("td[data-column='"+xPos[i]+"'][data-row='"+yPos[i]+"']").css("background", ship.color);
		}
	}
}

class game {
	constructor(size, playername){
		p1 = new player(size, playername);
		p2 = new player(size);

		this.selectedShipID = shipType.NONE;
	}

	printBoard(player){
		switch(player){
			case "one":
			case 1:
				document.getElementsByClassName("player_one")[0].appendChild(p1.generateGridHTML());

				break;
			case "two":
			case 2:
				document.getElementsByClassName("player_two")[0].appendChild(p2.generateGridHTML());

				break;
			default:
				document.getElementsByClassName("grid")[0].appendChild(p1.generateGridHTML());
				document.getElementsByClassName("player-container")[0].appendChild(p1.generateGridHTML());
				document.getElementsByClassName("enemy-container")[0].appendChild(p2.generateGridHTML());

		}
	}
}

var p1, p2;
var currentGame = new game(10);
currentGame.printBoard();


currentGame.selectedShipVertical = true;

var $placeShip_Ships = $(".ship");
$placeShip_Ships.click(function(){
	$placeShip_Ships.removeClass("ship__active");
	$(this).addClass("ship__active");
	currentGame.selectedShipID = $(this).attr("data-ship-id");
});

var $placeShip_td = $("section#view-2 .grid td");
$placeShip_td.click(function(){
	if(currentGame.selectedShipID == shipType.NONE){
		return;
	}

	if(p1.createShip(currentGame.selectedShipID, currentGame.selectedShipVertical, $(this).attr('data-column'), $(this).attr('data-row'))){
		$placeShip_Ships.removeClass("ship__active");
		$(".ship[data-ship-id='"+currentGame.selectedShipID+"']").unbind('click').children("div.ship__container").attr("data-amount", "0");
		currentGame.selectedShipID = shipType.NONE;
	}
});

$("section#view-2 button.rotate").click(function(){
	currentGame.selectedShipVertical = !currentGame.selectedShipVertical;
	$(this).text(currentGame.selectedShipVertical ? "Vertikal": "Horisontell");
});