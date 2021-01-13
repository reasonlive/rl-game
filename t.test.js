function getNum(a,b){
	return a+b;
}

test('add nums', function(){
	expect(getNum(1,4)).toBe(5)
})