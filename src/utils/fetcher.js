import axios from 'axios';

export default class ClientFetcher{
	//get: isLogged,stat,offers,game/:id
	//post: login,registration,game/create

	//checks if user is authenticated and returns {logged}
	async checkSession(){
		let result = await axios.get('/isLogged');
		return result.data;
	}

	

	//send data to the server through registration process
	//and returns text : 'success'|'failure'
	async sendForRegistration(data){
		let result = await axios.post('/registration', data);
		return result;
	}


	//checks through the login process and returns logged user
	async sendForLogin(data){
		let result = await axios.post('/login',data);
		return result;
	}



	//gets all finished games
	async fetchStat(){
		let result = await axios.get('/stat');
		return result.data;
	}

	async fetchOffers(){
		let result = await axios.get('/offers');
		return result.data;
	}
	
	//sends game data through saving process
	//returns game data
	async sendForCreatingGame(data){
		let result = await axios.post('/game/create', data);
		return result.data;
	}


	async sendForCalculatePlayers(id){
		let result = await axios.get('/game/players?id='+id);
		return result.data;
	}

	async sendForAddPlayerToGame(){
		
	}

	//if purpose is 'end' it changes status of game to finished = true
	//if purpose is 'cancel' it canceled offer and deletes game from db
	//@return 'end' && updated game data || 'cancel' && string 'success'|'failure'
	async updateGameData(purpose,id){
		if(purpose === 'end'){
			let result = await axios.post('/game/update',id, {finished:true});
			return result;
		}
		if(purpose === 'cancel'){
			let result = await axios.post('game/delete', {id:id});
			return result;
		}
	}
}
