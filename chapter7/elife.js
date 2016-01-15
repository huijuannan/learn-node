"use strict";
var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];

console.log(plan);

function Vector(x,y){
    this.x = x;
    this.y = y;
}

Vector.prototype.plus = function(vector){
    return new Vector(this.x + vector.x, this.y + vector.y);
};

Vector.prototype.minus = function(vector){
    return new Vector(this.x - vector.x, this.y - vector.y);
};

Object.defineProperty(Vector.prototype, "distance", {
    get: function(){return Math.sqrt(this.x * this.x + this.y * this.y)}
});

function Grid(width, height){
      this.space = new Array(width * height);
      this.width = width;
      this.height = height;
}

Grid.prototype.isInside = function(vector){
      return vector.x >= 0 && vector.x < this.width &&
      vector.y >= 0 && vector.y < this.height;
};

Grid.prototype.get = function(vector){
      return this.space[vector.x + this.width * vector.y];
};

Grid.prototype.set = function(vector, value){
      this.space[vector.x + this.width * vector.y] = value;
};

Grid.prototype.forEach = function(f, context){
      for (var y = 0; y<this.height; y++){
            for (var x = 0; x<this.width; x++){
                  var value = this.space[x + this.width*y];
                  if (value != null){
                        f.call(context, value, new Vector(x,y))
                  }
            }
      }

}

var directions = {
      "n": new Vector( 0, -1),
      "ne": new Vector( 1, -1),
      "e": new Vector( 1, 0),
      "se": new Vector( 1, 1),
      "s": new Vector( 0, 1),
      "sw": new Vector( -1, 1),
      "w": new Vector(-1, 0),
      "nw": new Vector(-1, -1)
};

function randomArray(array){
      return array[Math.floor(Math.random() * array.length)];
}

directionName = ["n", "ne", "e", "se", "s", "sw", "w", "nw"];

function bouncingCritter(){
      this.direction = randomArray(directionName);
}

bouncingCritter.prototype.act = function(view){
      if (view.look(this.direction) != " ")
            this.direction = view.find(" ") || "s";
      return {type: "move", direction: this.direction};
};

function elementFromChar(legend, ch){
      if (ch == " ")
            return null;
      var element = new legend[ch]();
      element.originChar = ch;
      return element;
}

function World(map, legend){
      var grid = new Grid(map[0].length, map.length);
      this.grid = grid;
      this.legend = legend;

      map.forEach(function(line, y){
            for (var x = 0; x<line.length; x++){
                  grid.set(new Vector(x,y), elementFromChar(legend, line[x]))
            }
      });
}

function charFromElement(element){
      if (element == null)
            return " ";
      return element.originChar;
}

World.prototype.toString = function(){
      var output = "";
      for (var y = 0; y< this.grid.height; y++){
            for (var x = 0; x < this.grid.width; x++){
                  output += charFromElement(this.grid.get(new Vector(x,y)));
            }
            output += "\n";
      }
      return output;
}

World.prototype.turn = function(){
      var acted = [];
      this.grid.forEach(function(critter, vector){
            if (critter.act && acted.indexOf(critter) == -1){
                  this.letAct(critter, vector)
                  acted.push(critter)
            }
      }, this);
}

World.prototype.letAct = function(critter, vector){
      var action = critter.act(new View(this, vector));
      if (action && action.type == "move"){
            var des = this.checkDestination(action, vector);
            if (des && this.grid.get(des) == null){
                        this.grid.set(vector, null);
                        this.grid.set(des, critter);
                  }}
}

World.prototype.checkDestination = function(action, vector){
      if (directions.hasOwnProperty(action.direction)){
            var des = vector.plus(directions[action.direction]);
            if (this.grid.isInside(des))
                  return des;
      }
};

function Wall(){}

function View(world, vector){
      this.world = world;
      this.vector = vector;
}

View.prototype.look = function(dir){
      var des = this.vector.plus(directions[dir]);
      if (this.world.grid.isInside(des))
            return charFromElement(this.world.grid.get(des));
      else
            return "#";
};

View.prototype.findAll = function(ch){
      var output = [];
      for (var dir in directions){
            if (this.look(dir) == ch)
                  output.push(dir);
      }
      return output;
}

View.prototype.find = function(ch){
      var output = this.findAll(ch);
      if (output.length == 0) return null;
      return randomArray(output);
}

function dirPlus(dir, n){
      var index = directionName.indexOf(dir);
      return directionName[(index + n + 8) % 8];
}

function WallFollower(){
      this.dir = "s";
}

WallFollower.prototype.act = function(view){
      var start = this.dir;
      // if (view.look(dirPlus(this.dir, -3)) != " ")
      //       start = this.dir = dirPlus(this.dir, -2);
      while (view.look(this.dir) != " "){
            this.dir = dirPlus(this.dir, 1);
            if (this.dir == start) break;
      }
      return {type: "move", direction: this.dir};
}

var world = new World(plan, {"#": Wall, "o": WallFollower});

console.log(world.toString());

for (var i = 0; i<8; i++){
      world.turn();
      console.log(world.toString());
}