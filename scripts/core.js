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
	constructor(size){
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

		for(var y = 0; y < grid.length; y++){
			var row = document.createElement("tr");

			for(var x = 0; x < grid[y].length; x++){
				var column = document.createElement("td").attr("data-row-number", y).attr("data-row-column", x);
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
		if(grid[x][y]['hit']){
			return false;
		}else{
			grid[x][y]['hit'] = true;

			if(grid[x][y]['state'] == tileState.SHIP){

			}else{

			}
		}
	}
}

class game {
	constructor(size){
		this.p1 = new player(size);
		this.p2 = new player(size);
	}
}


//var test = new game("10");

/*

	static generateHTML(grid){
		var html = document.createElement("table");

		for(var i = 0; i < grid.length; i++){
			var row = document.createElement("tr");

			for(var j = 0; j < grid.length; j++){
				var column = document.createElement("td");
				row.appendChild(column);
			}

			html.appendChild(row);
		}

		return html;
	}

	*/