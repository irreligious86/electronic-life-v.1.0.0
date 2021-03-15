"use strict";
// The “#” symbol stands for walls and stones, “o” for a creature. Spaces are empty space.
let plan = ["############################",
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

// The grid that models the world has a width and height. Cells are defined by x and y coordinates.
function Vector(x, y) {
    this.x = x;
    this.y = y;
}
Vector.prototype.plus = function(other) {
    return new Vector(this.x + other.x, this.y + other.y);
};

// We can take one array, width × height, and decide that element (x, y) is at position x + (y × width).
let grid = ["top left",    "top middle",    "top right",
    "bottom left", "bottom middle", "bottom right"];
console.log(grid[3 + (1 * 2)]);
// → bottom right


// The following code declares a Grid object with basic methods:
function Grid(width, height) {
    this.space = new Array(width * height);
    this.width = width;
    this.height = height;
}
Grid.prototype.isInside = function(vector) {
    return vector.x >= 0 && vector.x < this.width &&
        vector.y >= 0 && vector.y < this.height;
};
Grid.prototype.get = function(vector) {
    return this.space[vector.x + this.width * vector.y];
};
Grid.prototype.set = function(vector, value) {
    this.space[vector.x + this.width * vector.y] = value;
};


// Testing
// let grid = new Grid(5, 5);
// console.log(grid.get(new Vector(1, 1)));
// → undefined
// grid.set(new Vector(1, 1), "X");
// console.log(grid.get(new Vector(1, 1)));
// → X


// This the object will be used to convert from direction names to coordinate offsets
let directions = {
    "n":  new Vector( 0, -1),
    "ne": new Vector( 1, -1),
    "e":  new Vector( 1,  0),
    "se": new Vector( 1,  1),
    "s":  new Vector( 0,  1),
    "sw": new Vector(-1,  1),
    "w":  new Vector(-1,  0),
    "nw": new Vector(-1, -1)
};

// A simple creature that just walks until it hits an obstacle and then bounces off in a random direction
// function randomElement(array) {
//     return array[Math.floor(Math.random() * array.length)];
// }
//
// function BouncingCritter() {
//     this.direction = randomElement(Object.keys(directions));
// };
//
// BouncingCritter.prototype.act = function(view) {
//     if (view.look(this.direction) != " ")
//         this.direction = view.find(" ") || "s";
//     return {type: "move", direction: this.direction};
// };

// The constructor takes a plan (an array of strings representing the grid of the world) and a legend object. It is an object that communicates what each of the symbols on the map means. It has a constructor for every character - except for the space, which refers to null (representing empty space)
// function elementFromChar(legend, ch) {
//     if (ch == " ")
//         return null;
//     let element = new legend[ch]();
//     element.originChar = ch;
//     return element;
// }
//
// function World(map, legend) {
//     let grid = new Grid(map[0].length, map.length);
//     this.grid = grid;
//     this.legend = legend;
//
//     map.forEach(function(line, y) {
//         for (let x = 0; x < line.length; x++)
//             grid.set(new Vector(x, y),
//                 elementFromChar(legend, line[x]));
//     });
// }

// The wall is a simple object. Used to occupy space and does not have an act method.
// function Wall() {};

// By inspecting the World object, instantiating it, and then calling its toString method, we get a string similar to this plan.
// let world = new World(plan, {"#": Wall, "o": BouncingCritter});
// console.log(world.toString());
// → ############################
//   #      #    #      o      ##
//   #                          #
//   #          #####           #
//   ##         #   #    ##     #
//   ###           ##     #     #
//   #           ###      #     #
//   #   ####                   #
//   #   ##       o             #
//   # o  #         o       ### #
//   #    #                     #
//   ############################
