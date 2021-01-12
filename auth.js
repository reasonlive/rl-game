function register(fields){

	let {name,mail,password} = fields;
	if(!mail) return new Error('EmailError');
	if(!password)return new Error('PasswordError');
	console.log(`${name} you have such email: ${mail}`)

	let {name,mail,password} = fields;
	
}