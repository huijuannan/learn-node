var inputnum = process.argv.slice(2)
var sum=inputnum.reduce(function(a,b){
	return Number(a)+Number(b);
})
console.log(sum)