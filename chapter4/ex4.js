function deepEqual(a,b){
    if (a === b)
        return true;
    if (typeof a != 'object' || typeof b != 'object' ||
        a === null || b ===  null)
        return false;
    var parinA = 0, parinB = 0;

    for (var par in a)
        parinA += 1;

    for (var par in b){
        parinB += 1;
        if (!(par in a) || !deepEqual(a[par],b[par]))
            return false;
        }
    return parinA == parinB;
    }


var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {here: 1, object: 2}));
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));