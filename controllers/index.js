const userController = require('./User');
const gameController = require('./Game');


module.exports = class DataFetcher{
	

	async add(entity,data){
		if(entity === 'user'){
			let result = await userController.addUser(data);
			return result;
		}
		if(entity === 'game'){
			let result = await gameController.addGame(data);
			return result;
		}
	}

	async get(entity,id){
		if(entity === 'user'){
			let result = await userController.getUser(id);
			return result;
		}
		if(entity === 'game'){
			let result = await gameController.getGame(id);
			return result;
		}
	}

	async update(entity,id,data){
		if(entity === 'user'){
			let result = await userController.updateUser(id,data);
			return result;
		}
		if(entity === 'game'){
			let result = await gameController.updateGame(id,data);
			return result;
		}
	}

	async delete(entity,id){
		if(entity === 'user'){
			let result = await userController.deleteUser(id);
			return result;
		}
		if(entity === 'game'){
			let result = await gameController.deleteGame(id);
			return result;
		}
	}

	async all(entity){
		if(entity === 'users'){
			let result = await userController.getAll();
			return result;
		}
		if(entity === 'games'){
			let result = await gameController.getAll();
			return result;
		}
	}


	//USER ACTIONS
	//check if user is registered and right password and logs him if so
	//updated online status and returns user data
	async loginUser(data){
		if(typeof data === 'object'){
			let {email,password,ipLog} = data;
			let user = await userController.getUserByEmail(email);
			if(!user || user instanceof Error)return new Error('User is not exists!');
			let validated = await userController.checkPassword(user.id,password);
			if(!validated){
				return new Error('Wrong password!');
			}
			user = await userController.updateUser(user.id,{online:true,lastIpLog:ipLog});
			console.log(user)
			return user;
		}
	}

	//changes online status and returns user data
	async logoutUser(id){
		let result = await userController.updateUser(id,{online:false});
		return result;
	}
}




