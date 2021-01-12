function sayHello(name){
	let days = ['monday', 'tuesday', 'wednesday', 'thursday','friday','satarday','sunday'];
	let day = new Date().getDay();
	return "hello "+name+"! Today is "+days[day-1];
}

console.log(sayHello('Brother'));