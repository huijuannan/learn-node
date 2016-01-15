var myCat = [
            {name:'Marnie', color:'white and yellow', sex:'f', weightInKg:3},
            {name:'Gollum', color:'black', sex:'m', weightInKg: 4.2}
            ];
console.log(myCat);

var cat = {};
myCat.forEach(function(a){
                cat[a.name] = a;
                });

console.log(cat);

var catName = myCat.map(function(a){
                            return a.name;});

console.log(catName);

var meanWeight = myCat.reduce(function(a,b){
                return a.weightInKg +b.weightInKg;})/myCat.length;

console.log(meanWeight);