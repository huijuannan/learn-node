function rowHeights(rows){
    return rows.map(function(row){
        return row.reduce(function(max,cell){
            return Math.max(max, cell.minHeight());
        }, 0);
    });
}

function colWidths(rows){
    return rows[0].map(function(_, i){
        return rows.reduce(function(max, row){
            return Math.max(max, row[i].minWidth());
        }, 0);
    });
}
function repeat(string, times){
    var result = "";
    for (var i = 0; i<times; i++){
        result += string;
    }
    return result;
}

function TextCell(text){
    this.text = text.split("\n");
}

TextCell.prototype.minWidth = function(){
    return this.text.reduce(function(width, line){
        return Math.max(width, line.length);
    }, 0)
}

TextCell.prototype.minHeight = function(){
    return this.text.length;
}

TextCell.prototype.draw = function(width, height){
    var result = [];
    for (var i = 0; i<height; i++){
        var line = this.text[i] || "";
        result.push(line + repeat(" ", width - line.length));
    }
    return result;
}

function drawTable(rows){
    var heights = rowHeights(rows);
    var widths = colWidths(rows);

    function drawLine(blocks, lineNo) {
        return blocks.map(function(block){
            return block[lineNo];
        }).join(" ");
    }

    function drawRow(row, rowNum){
        var blocks = row.map(function(cell, colNum){
            return cell.draw(widths[colNum], heights[rowNum]);
        });
        return blocks[0].map(function(_, lineNo){
            return drawLine(blocks, lineNo);
        }).join("\n");
    }

    return rows.map(drawRow).join("\n");
}


// ex2
function StrechCell(inner, width, height){
    this.inner = inner;
    this.width = width;
    this.height = height;
}

StrechCell.prototype.minHeight = function(){
    return Math.max(this.inner.minHeight(), this.height);
}

StrechCell.prototype.minWidth = function(){
    return Math.max(this.inner.minWidth(), this.width);
}

StrechCell.prototype.draw = function(width, height){
    return this.inner.draw(width, height);
}
// end of ex2 

var rows = [];
for (var i = 0; i<5; i++){
    var row = [];
    for (var j = 0; j<5; j ++){
        if ((j+i)%2 === 0){
            row.push(new StrechCell(new TextCell("##"),4,2));
        }
        else
            row.push(new StrechCell(new TextCell("  "),3,1));
    }
    rows.push(row);
}

console.log(drawTable(rows));