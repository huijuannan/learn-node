function reverseArray(array){
    var newarray = [];
    for (var i = array.length-1; i>=0 ; i--){
        newarray.push(array[i]);
    }
    return newarray;
}
console.log(reverseArray([1,2,3,4]));

function reverseArrayInPlace(array){
    for (var i = 0; i<=Math.floor(array.length/2); i++){
        var old = array[i];
        array[i] = array[array.length-i-1];
        array[array.length-i-1] = old;}
    return array;
}

var array = [1,2,3,4];
console.log(reverseArray(array));
console.log(array);
console.log(reverseArrayInPlace(array));
console.log(array);