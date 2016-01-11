var ANCESTRY_FILE = require('./ancestry.js');
var ancestry = JSON.parse(ANCESTRY_FILE);

function some(array, fun){
    for (var i = 0; i<array.length; i++){
        if (fun(array[i]))
            return true;
    }
    return false;
}

function every(array, fun){
    for (var i = 0; i<array.length; i++){
        if (!fun(array[i]))
            return false;
    }
    return true;
}

console.log(every([NaN, NaN, NaN], isNaN));
// → true
console.log(every([NaN, NaN, 4], isNaN));
// → false
console.log(some([NaN, 3, 4], isNaN));
// → true
console.log(some([2, 3, 4], isNaN));