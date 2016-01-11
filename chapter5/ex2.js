var ANCESTRY_FILE = require('./ancestry.js');
// console.log(typeof ANCESTRY_FILE)
var ancestry = JSON.parse(ANCESTRY_FILE);
// console.log(ancestry.length)

function average(array){
    function plus(a,b){return a+b;}
    return array.reduce(plus) / array.length;
}

// var a = [1,2,3,5];
// console.log(average(a));

var byName = {};
ancestry.forEach(function(person){
    byName[person.name] = person;
});

// console.log(byName);

// var ageDelt = [];
// for (var person in byName){
//     var motherName = byName[person].mother;
//     if (byName[motherName]){
//         console.log(motherName);
//         ageDelt.push(byName[person].born - byName[motherName].born);
// }}

var ageDelt = ancestry.filter(function(person){
    return byName[person.mother] !== undefined;
}).map(function(person){
    return person.born - byName[person.mother].born;
});


console.log(ageDelt);
console.log(average(ageDelt));
