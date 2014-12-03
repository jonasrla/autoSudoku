function fillTable() {
	var table = [[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]]];
	for (var i = 0; i < 9; i++){
		for (var j = 0; j < 9; j++){
			table[i][j] = [[1,2,3,4,5,6,7,8,9],false];
		}
	}
	return table;
}

function updateTable(x, y, value, otable){
	table = copy(otable);
	table[x][y] = [[value],true];
	console.log(x,y,value);
	for (var i = 0; i < 9; i++){
		if (i != y){
			table[x][i][0] = removeFromList(value, table[x][i][0]);
		}
	}
	for (var i = 0; i < 9; i++){
		if (i != x){
			table[i][y][0] = removeFromList(value, table[i][y][0]);
		}
	}
	var subtable = getSubtable(x,y);
	for (var i = 0; i < 9; i++){
		var xPosition = subtable[i][0];
		var yPosition = subtable[i][1];
		if (xPosition != x && yPosition != y){
			table[xPosition][yPosition][0] = removeFromList(value, table[xPosition][yPosition][0]);
		}
	}
	return table;
}

function removeFromList(value,lista){
	var index = lista.indexOf(value);
	if (index == -1){
		return lista;
	}
	else {
		lista.splice(index,1);
		return lista;
	}
}
function getSubtable(x,y){
	var xPosition = [(x - (x % 3)),(x + 1 - (x % 3)),(x + 2 - (x % 3))];
	var yPosition = [(y - (y % 3)),(y + 1 - (y % 3)),(y + 2 - (y % 3))];
	var result = [];
	for (var i = 0; i < 3; i++){
		for (var j = 0; j < 3; j++){
			result.push([xPosition[i],yPosition[j]]);
		}
	}
	return result;
}

function finished(table){
	for (var i = 0; i < 9; i++){
		for (var j = 0; j < 9; j++){
			if (!table[i][j][1]){
				return false;
			}
		}
	}
	return true;
}

function findMinimunPossibitiesUnchecked(table){
	minimum = table[0][0][0].length;
	xMinimum = 0;
	yMinimum = 0;
	for (var i = 0; i < 9; i++){
		for (var j = 0; j < 9; j++){
			if (minimum < table[i][j][0].length){
				minimum = table[i][j][0].length;
				xMinimum = i;
				yMinimum = j;
			}
		}
	}
	return [i,j];
}

function createTable(){
	table = fillTable()
	while (!finished()){
		minimum = findMinimunPossibilitiesUnchecked(table)
		i = minimum[0]
		j = minimum[1]
		positionValue = Math.floor((Math.random() * table[i][j][0].length));
		table = updateTab(i,j,positionValue,table);
		alert()
		putTable(table)
	}

	return table
}

function

function putTable(table){
	HtmlTable = document.getElementById("table")
	var output = ""
	for (var i = 0; i < 9; i++){
		output += "            <tr>\n"
		for (var j = 0; j < 9; j++){
			output += "                <td>"+table[i][j]+"</td>\n"
		}
		output += "            <tr>\n"
	}
	HtmlTable.innerHTML = output
}