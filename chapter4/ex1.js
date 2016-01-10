var range = function(start, end, step){
    array = [];
    if (step === undefined)
        step = 1;
    if (step>0){
        for (i = start; i<=end; i+=step){
            array.push(i);
        }
    }
    else {
        for (i = start; i>=end; i+=step){
            array.push(i);
        }
    }
    return array;
};
console.log(range(1,10));
console.log(range(1,10,2));
console.log(range(5, 2, -1));

function sum(array){
    return array.reduce(function(a,b){return a+b;});
}
console.log(sum(range(1,10)));