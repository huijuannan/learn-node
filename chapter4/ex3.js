function arrayToList(array){
    var list = null;
    for (var i = array.length-1; i>=0; i--){
        list = {value:array[i], rest:list};
    }
    return list;
}

/*function listToArray(list){
    var array = [];
    array.push(list.value);
    while (list.rest !== null){
        list = list.rest;
        array.push(list.value);
    }
    return array;
}*/
function listToArray(list){
    var array = [];
    for (var node = list; node; node = node.rest)
        array.push(node.value);
    return array;
}

function prepend(value,list){
    var newlist = {};
    newlist.value = value;
    newlist.rest = list;
    return newlist;
}

function nth(list, num){
    if (!list)
        return undefined;
    else {
        if (num === 0)
            return list.value;
        else
            return nth(list.rest, num-1);
        
    }

}

console.log(arrayToList([1,2,3]));
var list = arrayToList([1,2,3]);
console.log(listToArray(list));
console.log(prepend(10,prepend(20,null)));
console.log(nth(list,2));