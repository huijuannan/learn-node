/*var size = process.argv.slice(2,3);
if (size <=1)
	console.log("Try something bigger than 1");
else{
	var board = '';
	for (var i = 0; i<size; i++){
		if (i%2 === 0){
			for (var j = 0; j<size; j++){
				board = board + '# ';
			}
			board = board + '\n';
		}
		else {
			for (var j = 0; j<size; j++){
				board = board + ' #';
			}
			board = board + '\n';
		}

}
console.log(board)

}*/

/*var size = process.argv.slice(2,3);
board = '';
for (var i = 0; i<size; i++){
	for (var j = 0; j<size; j++){
		if ( (i + j) % 2 === 0)
			board += ' ';
		else
			board += '#';
	}
	board += '\n';
}
console.log(board);*/

var size = 8;

var board = "";

for (var y = 0; y < size; y++) {
	console.log(y)
  for (var x = 0; x < size*2; x++) {
  	console.log((x+y)%2)

    if ((x + y) % 2 === 0)
      board += " ";
    else
      board += "#";
  }
  board += "\n";
}

console.log(board);