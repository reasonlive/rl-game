const schema = require('../models/User');
const crypto = require('crypto-js');
const Base = require('../customDB');
const base = new Base('base', 'users');

//returns user id or error
async function addUser(fields){
	try{
		let validatedFields = await schema.validate(fields);
		let userid = await base.add(null,validatedFields);
		return userid;
	}catch(e){
		let err = new Error(e.message);
		err.name = e.name;
		err.message = e.errors[0];
		return err;
	}
}

//returns user data
async function getUser(id){
	try{
		let user = await base.get(id);
		return user;
	}catch(e){
		return e;
	}
}
//returns all user entities
async function getAll(){
	let res =  await base.getAll();
	console.log(res);
	return res;
}

//returns user data
async function getUserByEmail(email){
	try{
		let user = await base.get(email);
		return user;
	}catch(e){
		return e;
	}
}
//returns boolean
async function deleteUser(id){
	try{
		let deleted = await base.remove(id);
		return deleted;
	}catch(e){
		return e;
	}
}

//updated values: {name,password,lastIpLog,wins,losses,online}
async function updateUser(id,values){
	try{
		let updated = await base.update(id,values);
		return updated;
	}catch(e){
		return e;
	}
}

//returns boolean
async function checkPassword(id,password){
	let user = await getUser(id);
	let decrypted = decryptHash(user.password);
	return decrypted === password;
}

//decrypt password from db
function decryptHash(hash){
		let bytes = crypto.AES.decrypt(hash, 'KHHuujdm44kvcifj599');
		return bytes.toString(crypto.enc.Utf8);
}

module.exports = {
	addUser,
	getUser,
	getAll,
	getUserByEmail,
	deleteUser,
	updateUser,
	checkPassword
}


//getUserByEmail('hello@mail.ru').then(result=>console.log(result))