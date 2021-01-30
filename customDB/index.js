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

class Database{

	constructor(dbname,collection){
		this.base = dbname;
		this.coll = collection;
	}

	async create(initState){
		if(initState){
			await fs.promises.writeFile(__dirname+"/"+this.base+".json", JSON.stringify(initState, 0, 2), 'utf8');
		}else{
			await fs.promises.writeFile(__dirname+"/"+this.base+".json", JSON.stringify({}, 0, 2), 'utf8');
		}
		
	}

	async  createCollection(collname){
		let file = await fs.promises.readFile(__dirname+'/'+this.base+'.json', 'utf8');
		let obj = JSON.parse(file);
		let newData = {
			...obj,
			[collname]: []
		}
		await fs.promises.writeFile(__dirname+'/'+this.base+'.json', JSON.stringify(newData, 0,2), 'utf8');
		return true;
	}

	async  createField(fieldname,value){

		let file = await fs.promises.readFile(__dirname+'/'+this.base+'.json', 'utf8');
		let obj = JSON.parse(file);
		let newData = {
			...obj,
			[fieldname]: value
		}
		await fs.promises.writeFile(__dirname+'/'+this.base+'.json', JSON.stringify(newData, 0,2), 'utf8');
		console.log(`field ${fieldname} was added`);
	}

	async  drop(){
		await fs.promises.writeFile(__dirname+'/'+this.base+'.json', '{}', 'utf8');
		return true;
	}


	//need to add only unique emails
	async  add(object){
		let result = false;
		let file = await fs.promises.readFile(__dirname+'/'+this.base+'.json', 'utf8');
		let obj = JSON.parse(file);
		
		//checks if collection exists and if such email value exists
		if(Array.isArray(obj[this.coll])){
			for(let item of obj[this.coll]){
				if(item.email && item.email === object.email){
					let err = new Error('Such email is already registered');
					err.name = 'DuplicateError';
					err.message = 'Such email is already used';
					return err;
				}
			}
			result = getRandId(24);
			obj[this.coll].push({...object,id: result});
		//if collection is not exists
		}else{
			console.log(`collection ${this.coll} is empty`);
			let created = await createCollection(this.coll);
			if(created){
				return await add(object);
			}
			
		} 

		

		await fs.promises.writeFile(__dirname+'/'+this.base+'.json', JSON.stringify(obj, 0,2), 'utf8');
		return result;
	}

	//@param property may be id or email
	async  get(property){
		let result = null;
		let file = await fs.promises.readFile(__dirname+'/'+this.base+'.json', 'utf8');
		let obj = JSON.parse(file);
		if(Array.isArray(obj[this.coll])){
			for(let field of obj[this.coll]){
				if(field && field.id === property || field.email === property){
					result = field;
					break;
				}
			}
		}

		file = obj = null;
		return result;
		console.log(result)
	}

	async  getAll(){
		let result = null;
		let file = await fs.promises.readFile(__dirname+'/'+this.base+'.json', 'utf8');
		let obj = JSON.parse(file);
		if(Array.isArray(obj[this.coll])){
			result = obj[this.coll];
		}

		file = obj = null;
		return result;
	}

	async  update(id,values){
		let result = null;
		let file = await fs.promises.readFile(__dirname+'/'+this.base+'.json', 'utf8');
		let obj = JSON.parse(file);
		if(Array.isArray(obj[this.coll])){
			for(let field of obj[this.coll]){
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

		await fs.promises.writeFile(__dirname+'/'+this.base+'.json', JSON.stringify(obj, 0,2), 'utf8');
		return result;
	}

	async  remove(id){
		let result = false;
		let file = await fs.promises.readFile(__dirname+'/'+this.base+'.json', 'utf8');
		let obj = JSON.parse(file);
		if(Array.isArray(obj[this.coll])){
			for(let i=0;i<obj[this.coll].length;i++){

				if(obj[this.coll][i].id === id){

					obj[this.coll].splice(i,1);
					result = true;
					break;
				}
			}
		}
		await fs.promises.writeFile(__dirname+'/'+dbname+'.json', JSON.stringify(obj, 0,2), 'utf8');
		return result;

	}



}


module.exports = Database;


























//test()
