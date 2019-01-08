var tileState = {
	WATER: 0,
	SHIP: 1
};

var shipType = {
	CARRIER: 5,
	BATTLESHIP: 4,
	CRUISER: 3,
	SUBMARINE: 3,
	DESTROYER: 2,
	EMPTY: 0
};

class player {
	constructor(size, playername){
		if(typeof playername == "undefined"){
			playername = "Dator";
		}

		this.score = 0;
		this.playername = playername;
		this.generateGrid(size);
	}

	generateGrid(size){
		this.grid = new Array(size);

		for(var y = 0; y < size; y++){
			this.grid[y] = new Array(size);

			for(var x = 0; x < size; x++){
				this.grid[y][x] = {state:tileState.WATER, hit:false};
			}
		}
	}

	generateGridHTML(){
		this.gridHTML = document.createElement("table");

		var guide = 'ABCDEFGHIJ';

		var header = document.createElement("tr");
		var corner = document.createElement("th");
		header.appendChild(corner);

		for(var i = 0; i < this.grid.length; i++){
			var head_item = document.createElement("th");
			head_item.innerHTML = guide.charAt(i);
			header.appendChild(head_item);
		}
		this.gridHTML.appendChild(header);

		for(var y = 0; y < this.grid.length; y++){
			var row = document.createElement("tr");
			var head_item = document.createElement("th");
			head_item.innerHTML = y+1;
			row.appendChild(head_item);

			for(var x = 0; x < this.grid[y].length; x++){
				var column = document.createElement("td");
				column.setAttribute("data-row-number", y);
				column.setAttribute("data-row-column", x);
				row.appendChild(column);
			}

			this.gridHTML.appendChild(row);
		}

		return this.gridHTML;
	}

	// RETURNS FALSE IF IS ALREADY HIT
	// RETURNS TRUE IF

	// CREATE CHECKTILE AND ISHIT FUNCTIONS
	// CHECKTILE RETURNS TRUE IF IT ISNT HIT AND FALSE IF IT ALREADY IS HIT
	// ISHIT RETURNS TRUE IF A SHIP IS HIT ON TILE AND FLASE IF IT DIDNT HIT A SHIP


	checkTile(x, y){
		if(this.grid[x][y]['hit']){
			return false;
		}else{
			this.grid[x][y]['hit'] = true;

			if(this.grid[x][y]['state'] == tileState.SHIP){

			}else{

			}
		}
	}
}

class game {
	constructor(size, playername){
		this.p1 = new player(size, playername);
		this.p2 = new player(size);
	}

	printBoard(player){
		switch(player){
			case "one":
			case 1:
				document.getElementsByClassName("player_one")[0].appendChild(this.p1.generateGridHTML());

				break;
			case "two":
			case 2:
				document.getElementsByClassName("player_two")[0].appendChild(this.p2.generateGridHTML());

				break;
			default:
				document.getElementsByClassName("grid")[0].appendChild(this.p1.generateGridHTML());
				document.getElementsByClassName("player_two")[0].appendChild(this.p2.generateGridHTML());

		}
	}
}

var test = new game(10);
test.printBoard();