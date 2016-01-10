var numSlice = process.argv.slice(2,3);
for(var slash = '#'; slash.length <= numSlice; slash += '#'){
	console.log(slash);
}