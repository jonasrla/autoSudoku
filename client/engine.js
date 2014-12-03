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

function findMinimumPossibilitiesUnchecked(table){
	var minimum = 9;
	var xMinimum = 0;
	var yMinimum = 0;
	for (var i = 0; i < 9; i++){
		for (var j = 0; j < 9; j++){
			if (minimum > table[i][j][0].length && !table[i][j][1]){
				minimum = table[i][j][0].length;
				xMinimum = i;
				yMinimum = j;
			}
		}
	}
	return [xMinimum,yMinimum];
}

// function createTable(){
// 	table = fillTable();
// 	while (!finished(table)){
// 		minimum = findMinimumPossibilitiesUnchecked(table);
// 		i = minimum[0];
// 		j = minimum[1];
// 		positionValue = Math.floor((Math.random() * table[i][j][0].length));
// 		table = updateTable(i,j,positionValue,table);
// 		putTable(table);
// 	}

// 	return table;
// }

function putTable(table){
	var HtmlTable;
	HtmlTable = document.getElementById("table");
	var output = "";
	for (var i = 0; i < 9; i++){
		output += "            <tr>\n";
		for (var j = 0; j < 9; j++){
			output += "                <td>"+table[i][j]+"</td>\n";
		}
		output += "            <tr>\n";
	}
	HtmlTable.innerHTML = output;
}

function createTable(){
	return doTheMagic(fillTable(), 0);
}

function getBlock(table){
	if (!finished(table)){
		return findMinimumPossibilitiesUnchecked(table);
	}
	return undefined;
}

function copy(table){
	var result = [];
	for (var i = 0; i < table.length; i++){
		result[i] = table[i].slice(0);
	}
	return result;
}

function doTheMagic(table, escopo){
	var i, j, trialTable, value, block, result, positionValue;
	block = getBlock(table);
	if (block){
		var i = block[0];
		var j = block[1];
		possibleEntries = table[i][j][0].slice(0);
		while (possibleEntries.length > 0){
			var positionValue = Math.floor((Math.random() * possibleEntries.length))
			var value = possibleEntries[positionValue];
			var trialTable = updateTable(i, j, value, table);
			var result = doTheMagic(trialTable, escopo+1);
			putTable(table);
			if (result !== undefined){
				return result;
			}
			console.log("Failed", escopo,i,j,value);
			possibleEntries.splice(positionValue,1);
			console.log(possibleEntries);
			console.log(trialTable[i][j][0]);
			console.log(table[i][j][0]);
			alert()
		}
		return undefined;
	}
	return table;
}
