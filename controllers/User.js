const schema = require('../models/User');
const crypto = require('crypto-js');
const db = require('../customDB');
const base = db('base', 'users');

async function addUser(fields){
	try{
		let validatedFields = await schema.validate(fields);
		let userid = await base('add', null,validatedFields);
		return userid;
	}catch(e){
		let err = new Error(e.message);
		err.name = e.name;
		err.message = e.errors[0];
		return err;
	}
}

async function getUser(id){
	try{
		let user = await base('get',id);
		return user;
	}catch(e){
		return e;
	}
}

async function deleteUser(id){
	try{
		let deleted = await base('remove', id);
		return deleted;
	}catch(e){
		return e;
	}
}

//updated values: {name,password,lastIpLog,wins,losses,online}
async function updateUser(id,values){
	try{
		let updated = await base('update', id,values);
		return updated;
	}catch(e){
		return e;
	}
}

async function checkPassword(id,password){
	let user = await getUser(id);
	let decrypted = decryptHash(user.password);
	return decrypted === password;
}


function decryptHash(hash){
		let bytes = crypto.AES.decrypt(hash, 'KHHuujdm44kvcifj599');
		return bytes.toString(crypto.enc.Utf8);
}

module.exports = {
	addUser,
	getUser,
	deleteUser,
	updateUser,
	checkPassword
}
