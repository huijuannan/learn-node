function measureLoopSpeed(){
	var count = 0
	function addone(){
		count = count +1
	}
	var timenow = Date.now()
	while(Date.now() - timenow<1000){addone()}

	console.log(count)
}

measureLoopSpeed()