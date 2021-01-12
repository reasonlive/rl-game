function register(fields){
	let {name,email,password} = fields;
	if(!email) return new Error('EmailError');
	if(!password)return new Error('PasswordError');
}