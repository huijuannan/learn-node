var x = "I'm outside x";
var f1 = function(){
    var x = "I'm inside f1";
};
f1();
console.log(x);

var f2 = function(){
    x = 'inside f2';
};
f2();
console.log(x);
