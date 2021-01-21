const fs = require('fs');

function getRandId(num){
	let chars = 'abcdef0123456789';
	let resultStr = '';
	for(let i=0;i<num;i++){
		let randNum = Math.random()*(chars.length-1);
		resultStr += chars.charAt(randNum);
	}
	return resultStr;
}


async function create(dbname, initState){
	if(initState){
		await fs.promises.writeFile(__dirname+"/"+dbname+".json", JSON.stringify(initState, 0, 2), 'utf8');
	}else{
		await fs.promises.writeFile(__dirname+"/"+dbname+".json", JSON.stringify({}, 0, 2), 'utf8');
	}
	
}

async function createCollection(dbname, collname){
	let file = await fs.promises.readFile(__dirname+'/'+dbname+'.json', 'utf8');
	let obj = JSON.parse(file);
	let newData = {
		...obj,
		[collname]: []
	}
	await fs.promises.writeFile(__dirname+'/'+dbname+'.json', JSON.stringify(newData, 0,2), 'utf8');
	return true;
}

async function createField(dbname,fieldname){
	let file = await fs.promises.readFile(__dirname+'/'+dbname+'.json', 'utf8');
	let obj = JSON.parse(file);
	let newData = {
		...obj,
		[fieldname]: ""
	}
	await fs.promises.writeFile(__dirname+'/'+dbname+'.json', JSON.stringify(newData, 0,2), 'utf8');
	console.log(`field ${fieldname} was added`);
}


async function drop(dbname){
	await fs.promises.writeFile(__dirname+'/'+dbname+'.json', '{}', 'utf8');
	return true;
}

//need to add only unique emails
async function add(dbname,collection, object){
	let result = false;
	let file = await fs.promises.readFile(__dirname+'/'+dbname+'.json', 'utf8');
	let obj = JSON.parse(file);
	
	//checks if collection exists and if such email value exists
	if(Array.isArray(obj[collection])){
		for(let item of obj[collection]){
			if(item.email && item.email === object.email){
				let err = new Error('Such email is already registered');
				err.name = 'DuplicateError';
				err.message = 'Such email is already used';
				return err;
			}
		}
		result = getRandId(24);
		obj[collection].push({...object,id: result});
	//if collection is not exists
	}else{
		console.log(`collection ${collection} is empty`);
		let created = await createCollection(dbname,collection);
		if(created){
			return await add(dbname,collection,object);
		}
		
	} 

	

	await fs.promises.writeFile(__dirname+'/'+dbname+'.json', JSON.stringify(obj, 0,2), 'utf8');
	return result;
}

//@param property may be id or email
async function get(dbname,collection,property){
	let result = null;
	let file = await fs.promises.readFile(__dirname+'/'+dbname+'.json', 'utf8');
	let obj = JSON.parse(file);
	if(Array.isArray(obj[collection])){
		for(let field of obj[collection]){
			if(field && field.id === property || field.email === property){
				result = field;
				break;
			}
		}
	}

	file = obj = null;
	return result;
}

async function getAll(dbname,collection){
	let result = null;
	let file = await fs.promises.readFile(__dirname+'/'+dbname+'.json', 'utf8');
	let obj = JSON.parse(file);
	if(Array.isArray(obj[collection])){
		result = obj[collection];
	}

	file = obj = null;
	return result;
}

async function update(dbname,collection,id,values){
	let result = null;
	let file = await fs.promises.readFile(__dirname+'/'+dbname+'.json', 'utf8');
	let obj = JSON.parse(file);
	if(Array.isArray(obj[collection])){
		for(let field of obj[collection]){
			if(field.id === id){
				for(let prop in values){
					if(prop === 'email' || prop === 'id')
						throw new Error('email or id is forbidden to update');
					field[prop] = values[prop];
				}
				result = field;
				break;
			}
		}
	}

	await fs.promises.writeFile(__dirname+'/'+dbname+'.json', JSON.stringify(obj, 0,2), 'utf8');
	return result;
}

async function push(dbname,collection,id,array,value){
	
}

async function remove(dbname,collection,id){
	let result = false;
	let file = await fs.promises.readFile(__dirname+'/'+dbname+'.json', 'utf8');
	let obj = JSON.parse(file);
	if(Array.isArray(obj[collection])){
		for(let i=0;i<obj[collection].length;i++){

			if(obj[collection][i].id === id){

				obj[collection].splice(i,1);
				result = true;
				break;
			}
		}
	}
	await fs.promises.writeFile(__dirname+'/'+dbname+'.json', JSON.stringify(obj, 0,2), 'utf8');
	return result;

}


async function test(){
	/*await drop('base');
	await createCollection('base','users');
	await add('base','users',{name: 'John', age:334});
	await add('base', 'users', {name:'Sasha', country: 'Russia'});*/
	await add('base', 'users', {name: 'Reason', age:33});
}


module.exports =  function createConnection(dbname,collection){

	const db = dbname,coll = collection;

	return async function connect(action,id,values){
		switch(action){
			case 'create': return await create(db);
			case 'drop': return await drop(db);
			case 'createCollection': return await createCollection(db,coll);
			case 'add': return await add(db,coll,values);
			case 'remove': return await remove(db,coll,id);
			case 'update': return await update(db,coll,id,values);
			case 'get': return await get(db,coll,id);
			case 'getAll': return await getAll(db,coll); 
			default: return await null;
		}
	}
}

//test()
