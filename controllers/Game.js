const schema = require('../models/Game');
const db = require('../customDB');
const base = db('base', 'games');


async function addGame(fields){
	try{
		let validatedFields = await schema.validate(fields);
		let gameid = await base('add', null,validatedFields);
		return gameid;
	}catch(e){
		let err = new Error(e.message);
		err.name = e.name;
		err.message = e.errors && e.errors[0];
		return err;
	}
}

async function getGame(id){
	try{
		let game = await base('get',id);
		return game;
	}catch(e){
		return e;
	}
}

async function deleteGame(id){
	try{
		let deleted = await base('remove', id);
		return deleted;
	}catch(e){
		return e;
	}
}

//updated values: {startDate,endDate,players,winner,history}
async function updateGame(id,values){
	try{
		let updated = await base('update', id,values);
		return updated;
	}catch(e){
		return e;
	}
}

async function addUserToGame(userId,gameId){
	let game = await getGame(gameId);
	console.log(game)
	if(game.players.length > 1)throw new Error('Max amount of players is 2');
	let array = game.players;
	!array.includes(userId) && array.push(userId);
	try{
		let updated = await updateGame(gameId,{'players':array});
		return updated;
	}catch(e){
		return e;
	}
}

async function test(){

	let game = {
		startDate: new Date(),
		endDate: new Date(),
		players: ['users'],
		winner: 'user',
		history: [
		{'1': 
			{
				username: 'name',
				usercard: 'card'
			
			}
		}]
	}

	try{

		//let added = await addGame(game);
		//if(added instanceof Error)return added;
		let updated = await addUserToGame("176ffd46787555c1114347b4","0a2c058a872e5f75468023a6");
		console.log(updated)
		return updated;
	}catch(e){
		throw e;
	}
}


//test()

module.exports = {
	addGame,
	deleteGame,
	updateGame,
	addUserToGame,
}