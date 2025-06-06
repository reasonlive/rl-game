const yup = require('yup');
const crypto = require('crypto-js');

function makeHash(password){
		return crypto.AES.encrypt(password, 'KHHuujdm44kvcifj599').toString();
}

function decryptHash(hash){
		let bytes = crypto.AES.decrypt(hash, 'KHHuujdm44kvcifj599');
		return bytes.toString(crypto.enc.Utf8);
}
 


let schema = yup.object().shape({
	name: yup.string().required(),
	email: yup.string().email(),
	password: yup.string().required().transform(function(value,oldValue){
		return makeHash(value)
	}),
	registered: yup.date().default(()=> new Date()),
	wins: yup.number().integer().default(0),
	losses: yup.number().integer().default(0),
	online: yup.boolean().default(()=> false),
	lastIpLog: yup.mixed({
		date: yup.date(),
		ip: yup.string()
	})

})




module.exports = schema;