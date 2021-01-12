function getRandId(num){
	let chars = 'abcdef0123456789';
	let resultStr = '';
	for(let i=0;i<num;i++){
		let randNum = Math.random()*(chars.length-1);
		resultStr += chars.charAt(randNum);
	}
	return resultStr;
}