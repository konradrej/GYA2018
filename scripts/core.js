var tileState = {
	WATER: 0,
	SHIP: 1
};

var shipType = {
	CARRIER: 5,
	BATTLESHIP: 4,
	CRUISER: 3,
	SUBMARINE: 3,
	DESTROYER: 2
};

class player {
	constructor(){

	}

	constructor(size){
		this.grid = player.generateGrid(size);
	}

	static generateGrid(size){
		var grid = new Array(size);

		for(var x = 0; x < size; x++){
			grid[x] = new Array(size);

			for(var y = 0; y < size; y++){
				grid[x][y] = {state:tileState.WATER, hit:false};
			}
		}

		return grid;
	}

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
	constructor(){
		this.p1 = new player();
		this.p2 = new player();
	}

	constructor(size){
		this.p1 = new player(size);
		this.p2 = new player(size);
	}
}




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