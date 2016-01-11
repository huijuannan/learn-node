function average(array){
    function plus(a,b){return a+b;}
    return array.reduce(plus)/array.length;
}

var ANCESTRY_FILE = require('./ancestry.js');
var ancestry = JSON.parse(ANCESTRY_FILE);

// for (var century = 16; century<22; century ++){
//     console.log(century + ':' +
//         average(ancestry.filter(function(person){
//             return Math.ceil(person.died/100) == century;
//         }).map(function(person){return person.died - person.born;})));

// }

function groupBy(array, groupFun){
    var group = {};
    array.forEach(function(element){
        var groupName = groupFun(element);
        if (groupName in group)
            group[groupName].push(element);
        else
            group[groupName] = [element];
    });
    return group;
}

var byCentry = groupBy(ancestry, function(person){
    return Math.ceil(person.died/100);
});

// console.log(byCentry);
for (var cent in byCentry){
    var age = byCentry[cent].map(function(person){return person.died-person.born;});
    console.log(cent + ':' + average(age));
}