//gameact_test.js

 const timer = (state={},action={}) =>{
	switch(action.type){
		case "TIMER": return {
			...state,
			timerValue: action.timerValue
		};
		case 'RESTART_TIMER': return{
			timerValue: action.timerValue
		};

		case 'STOP_TIMER': return{
			...state,
			timerValue: -1
		};
		default: return state;

	}
}


 const players = (state={},action={}) => {

	switch(action.type){

		case 'PLAYER_ACT': return {
			...state,
			beat: action.beat || state.beat,
			hit: action.hit || state.hit,
			hold: action.hold,
			pick: action.pick || state.pick,
			data: action.data,
		};
		default:return state;
	}
}

 const cards = (state={},action={}) => {
	switch(action.type){
		case 'CARD_RENDER': return {
			...state,
			cards: action.cards || state.cards,
			activeCard: action.activeCard,
							
		};
		case 'HEAP_RENDER': return {
			...state,
			heap: action.heap || state.heap
		}
		default: return state;
	}
}






const info = (state = {history:[]}, action = {}) => {
	switch(action.type){
		case 'GET_OFFERS': return {
			...state,
			offers: action.offers
							
		};
		case 'GET_STATS': return {
			...state,
			games: action.games
							
		};
		case 'GET_OPPONENT': return {
			...state,
			opponent: action.opponent
							
		};
		case 'GET_LOGGED': return {
			...state,
			logged:action.logged
							
		};
		case 'GAME_TITLE': return {
			...state,
			title: action.title,

		}
		case 'GAME_PROCESS': return {
			...state,
			proc: action.proc
		}

		case 'GAME_HISTORY': return {
			...state,
			history: action.history,
			gameSet: action.gameSet,
			currentStep: action.currentStep
		}

		case 'SET_WINNER': return {
			...state,
			win: action.winner,
			winner: action.player,
			gameId: action.gameId
		}


		default: return state;
	}
}



const {combineReducers,createStore} = require('redux');

const reducers = combineReducers({timer,players,cards,info});


const store = createStore(reducers);


const chai = require('chai');
const expect = chai.expect;


const GameProcess = require('./game.js');

let player1 = {
	name: 'hello',
	wins: 10,
	losses: 0
}

let player2 = {
	name: 'world',
	wins: 0,
	losses:10
}

const proc = new GameProcess(player1,player2);
proc.shuffle();
proc.distribute(null,true);
proc.setFirst(proc.getDeck('0').suit);

store.dispatch({type:'GAME_PROCESS',proc:proc})
let initData = {
	cards: {
		player1: proc.players[0].cards,
		player2: proc.players[1].cards
	},
	activeCard: undefined
}
store.dispatch(
	{
		type:'CARD_RENDER',
		cards: initData.cards,
		activeCard:initData.activeCard
	}
)



//store.watchProc()

//HTML ELEMENT SIMULATOR
class Card {
	constructor(data){
		this.target.dataset.rank = data.rank;
		this.target.dataset.suit = data.suit;
		this.target.dataset.trump = data.trump || false;
		this.target.dataset.username = data.username;
		return this;
	}

	
	target = {
		dataset: {
			rank: '',
			suit: '',
			trump: '',
			username: ''
		}
		
	}
}

//tested module act.js
const act = (e) => {

		let {players,info,timer} = store.getState();
		//return store.getState();

		//which card was clicked on
		let {rank,suit,trump,username} = e.target.dataset;
		
		//return e.target.dataset;
		
			//number of set in the queue,
			let {gameSet,currentStep} = info;
			//return info;
			
			//cards from store,
			let {cards,activeCard} = store.getState().cards;
			
			//return store.getState().cards;

			//game process object
			let {proc} = info;
			//return proc;

			//all current actions 
			let {hit,beat,hold,pick} = players;
			
			//return players;
			//if it first step
			if(!hit){
				
				let first = undefined;
				for(let player of proc.players){
					if(player.first)first = player;
				}
				
				
				//return first;
				if(username !== first.name){
					return;
				}else{
					//set the attacker name in the store
					store.dispatch({type:'PLAYER_ACT',hit:{name:username}});
					
					let defendant;
					for(let player of proc.players){
						if(player.name !== username){
							defendant = player.name;
							break;
						}

					}
					
					//set the defendant name in the store
					store.dispatch({type:'PLAYER_ACT',beat:{name:defendant}});
					
					
					//put the card into heap, make it as an active card
					proc.intoHeap({rank,suit,trump,username})

				}
			//if it not the first step
			}else{
				
				//hit and beat values already exists
				let attacker = undefined;
				let defendant = undefined;

				for(let player of proc.players){
					if(player.name === hit.name)attacker = player;
					if(player.name === beat.name)defendant = player;
				}

				let lastHeapCard = activeCard;
				console.log(lastHeapCard)
				
				//checking whose step must be
				if(lastHeapCard && lastHeapCard.username === username){
					
					return;
				}

				if(!lastHeapCard && username === beat.name){
					console.log('you must not move!');
					return;
				}
				
				if(defendant.name === username){
					//CHECK THE RULES!
					let allowed = proc.checkStep(
							//the last card at the top of the heap
							proc.heap[proc.heap.length-1],
							//the current acting card
							{rank,suit,trump}
						);
					
					
					if(!allowed)return;
					
				}
				//checks which card the attacker can add
				if(attacker.name === username && lastHeapCard){
					let variants = info.history;
					let options = [];
					for(let option of variants){
						let step = option.step.split('/')[0];
						options.push(step);
					}
					if(!options.includes(rank))return;
				}

				proc.intoHeap({rank,suit,trump,username});
				if(!proc.getDeck() && attacker.cards.length < 1){
					store.dispatch({type:'SET_WINNER',winner:true,player:result});
					attacker.winner = true;
				}

				
			}
			

			//find the card of actor and take it from him
			//let whoseCards = proc.player1.name === username ? proc.player1.cards : proc.player2.cards;

			//delete card from player's hand
			//let ind = whoseCards.findIndex(item => item.rank === rank && item.suit === suit)
			//whoseCards.splice(ind,1);


			/*let mutatedHistory = info.history.concat([
				{gameSet:gameSet,currentStep:++currentStep,name:username,step:rank+'/'+suit}

				]);*/

				let mutatedHistory = [];
	
		let dataToChange = {
			history: mutatedHistory,
			activeCard: {rank,suit,trump,username},
			cards: {
				...cards,
			},
			gameSet:gameSet,
			currentStep:currentStep
			
		}
		//console.log(dataToChange)

		
		store.dispatch({type:'PLAYER_ACT',data:dataToChange});
		store.dispatch({type:'CARD_RENDER',activeCard:{rank,suit,trump,username}})
		console.log('end of function')
		//restart timer
		//store.dispatch(setTimer('RESTART_TIMER',30));
		
	}


	//hold.js
	//hold function

	const hold = ()=>{

		let {cards,players,info} = store.getState();
		let {gameSet,currentStep} = info;
		 
		if(!players.beat)return;

		//the check for online game through websocket
		/*if(!localStorage.getItem('singleMode') &&  players.beat.name !== localStorage.getItem('name')){
			return;
		}*/

		let descr = {
			name: players.beat.name
		}

		store.dispatch({type:'PLAYER_ACT',hold:{name:players.beat.name}});

		let whoHold = undefined;
		for(let player of store.getState().info.proc.players){
			if(player.name === players.beat.name)whoHold = player;
		}
		
		info.proc.takeHeap(whoHold);


		let mutatedHistory = info.history.concat([
				{gameSet:++gameSet,currentStep:0,name:'',step:''}

				]);


		let dataToChange = {
			history: mutatedHistory,
			cards: {
				...cards.cards,
			},
			activeCard: '',
			gameSet: gameSet,
			currentStep:1
		}


		//store.dispatch(setPlayerAction({data:dataToChange})); //pick must makes itself
		//store.dispatch(setTimer('RESTART-TIMER',30));	
	}

	//pick.js
	//pick function
	const pick = ()=>{

		let {players,info} = store.getState();
		let {beat,hit,hold} = players;

		let {gameSet,currentStep} = info;
		

		let {proc} = info;
		
		
		//checks if attacker exists
		if(!hit)return;

		
		//how many cards remains in the deck
		let cardsRemained = proc.getDeck() && proc.getDeck().length || 0;


		store.dispatch({type:'PLAYER_ACT',pick:{name:hit.name}});
		//store.dispatch(setPlayerAction({pick:descr}));

		
		if(hold){
			
			
			let picker = undefined;
			for(let player of proc.players){
				if(player.name === store.getState().players.pick.name)picker = player;
			}

			//give cards to picker
			let result = proc.distribute(picker);
			
			if(result && result.winner){
					
				let url = window.document.location.href;
				let id = url.slice( url.lastIndexOf('/')+1,url.length);
				store.dispatch({type:'SET_WINNER',winner:true,player:result});
				//store.dispatch(setWinner({winner:proc.player1,id:id}));
				return;
			}
			store.dispatch({type:'PLAYER_ACT',hold:''});
			//store.dispatch(setPlayerAction({hold:''}));
			
		}else{
			//give cards to both
			for(let player of proc.players){
				proc.distribute(player);
			}
			
			//reverse players
			let whoHit = beat.name;
			let whoBeat = hit.name;

			let mutatedHistory = info.history.concat([
				{gameSet:++gameSet,currentStep:0,name:'',step:''}

				]);

			store.dispatch({type:'PLAYER_ACT',hit:{name:whoHit},beat:{name:whoBeat}})
			
			/*store.dispatch(setPlayerAction(
				{hit:{name:whoHit},beat:{name:whoBeat},data:{history: mutatedHistory,gameSet:gameSet,currentStep:0}}
				));*/
			
			//remove the active card from the table
			store.dispatch({type:'CARD_RENDER', activeCard:''});

			//and there is must be timer restart


		}
		
		
	}

	//auto functions
	function makeAutoAttack(player,heap){

		//console.log(player.name + " is hit");
		let cards = player.cards;


		let whichCard = undefined;

		for(let card of cards){
			if(heap.length < 1){
				whichCard = card;
				break;
			}else{
				for(let heapCard of heap){
					if(heapCard.rank === card.rank){
						whichCard = card;
						break;
					}
				}
			}
		}
		
		//console.log(whichCard)
		if(whichCard){

			return {
				...whichCard,
				username: player.name
			}
		}else{
			return null;
		}

		

	}

	function makeAutoDefence(player,targetCard){
		//console.log(player.name + " is beat");
		let cards = player.cards;
		let whichCard = undefined;

		for(let card of cards){
			if(proc.checkStep(targetCard,card)){
				whichCard = card;
				break;
			}else{
				continue;
			}
		}
		//console.log(whichCard)
		if(whichCard){

			
			return {
				...whichCard,
				username: player.name
			}
		}else{
			return null;
		}

	}

/////////////////////////TESTS//////////////////////////////////
///////////////////////////////////////////////////////////////
/////////////////////////TESTS/////////////////////////////////





describe.skip('html card element',  () => {
	
	it('html card has target property',  () => {
		expect(card).to.have.property('target');
	})

	it('card property target has property dataset',  () => {
		
		expect(card.target).to.have.property('dataset');
	})

	it('card property dataset has rank,suit,trump,username',  () => {
		
		expect(card.target.dataset).to.have.property('rank').that.is.a('string');
		expect(card.target.dataset).to.have.property('suit').that.is.a('string');
		expect(card.target.dataset).to.have.property('username').that.is.a('string');
		expect(card.target.dataset).to.have.property('trump').that.is.a('boolean');
		
	})

})

describe.skip('TESTING hold.js',  () => {

		it('defendant hold a card from attacker', () => {
			hold();
			let {hit,beat} = store.getState().players;
			let defendant = undefined;
			for(let player of proc.players){
				if(beat.name && player.name === beat.name)
					defendant = player;
			}

			expect(defendant.cards).to.be.an('array').that.has.lengthOf(7);
		})

		it('defendant still in his role',  () => {
			let {players,info} = store.getState();

			expect(players.beat.name).to.equal(info.proc.players[1].name);
		})
})

describe.skip('TESTING pick.js', () => {
	
	it.skip('attacker picks one card after defendant hold', () => {
		pick();
		let {players,info} = store.getState();
		let proc = info.proc;
		

		expect(players.pick.name).to.equal(proc.players[0].name);
		expect(proc.players[0].cards).to.be.an('array').that.has.lengthOf(6);
	})

	it('attacker and defendant picks cards', () => {
		let proc = store.getState().info.proc;
		act(new Card({rank:'6',suit:'spades',trump:false}));
		act(new Card({rank:'7',suit:'spades',trump:false}));
		
		pick();
		let {players} = store.getState();

		//players takes cards and inverts their roles
		expect(players.hit.name).to.equal(proc.players[1].name);
		expect(proc.players[1].cards.length).to.equal(6);
		expect(players.beat.name).to.equal(proc.players[0].name);
		expect(proc.players[0].cards.length).to.equal(6);
	})

})


describe.skip('TESTING act.js',  () => {

	describe('testing all needed vars in act.js',  () => {

		it.skip('store should be an object and should has {player,info,timer} props',  () => {
			expect(act(card)).to.be.an('object').that.has.all.keys('players','info','timer');
		})

		it.skip('card should be an object and should has {rank,suit,trump,username} props',  () => {
			expect(act(card)).to.be.an('object').that.has.all.keys('rank','suit','trump','username');
		})

		it.skip('store.info should be an object and should has {gameSet,currentStep,proc} props',  () => {
			expect(act(card)).to.be.an('object').that.has.all.keys('proc','gameSet','currentStep');
		})

		it.skip('store.cards should be an object and should has {cards, activeCard} props',  () => {
			expect(act(card)).to.be.an('object').that.has.all.keys('cards','activeCard');
		})

		it.skip('store.info.proc should be an object and should belong to class GameProcess',  () => {
			expect(act(card)).to.be.an.instanceof(GameProcess)
		})

		it.skip('store.players should be an object and should has {beat,hit,hold,pick} actions',  () => {
			expect(act(card)).to.be.an('object').that.is.has.all.keys('beat','hit','hold','pick','data');
		})

	})

	describe('testing logic if HIT action is not made yet',  () => {

		let proc = store.getState().info.proc;
		//console.log(proc.players[0])
		let hit = store.getState().players.hit;
		it('hit is not made yet',  () => {
			expect(hit).to.equal(undefined);
		})

		
		//console.log(proc.players)

		it('defines first player named "hello" as a beginner', () => {
			
			expect(proc.players[0]).to.has.property('first');
		})

		it('write HIT action in the store',  () => {

			let card = makeAutoAttack(proc.players[0],proc.heap);
			act(new Card(card));
			let hit = store.getState().players.hit;
			
			expect(hit).to.be.an('object').that.has.property('name','hello');
		})

		it('write BEAT action in the store',  () => {
			//act(card);
			
			let beat = store.getState().players.beat;
			expect(beat).to.be.an('object').that.has.property('name','world');
		})

		it('adding card into heap',  () => {
			
			

			expect(proc.heap[0]).to.be.an('object').that.has.all.keys('rank','suit','trump','username');
		})

		it('takes away one card from user',  () => {

			let user = store.getState().info.proc.players[0];
			expect(user.cards).to.be.an('array').that.has.lengthOf(5);
		})

	})

	describe.skip('testing logic if HIT was made',  () => {
		let proc = store.getState().info.proc;
		it('there is one card in the heap', () => {
			expect(proc.heap.length).to.equal(1);
		})

		it('card in the heap and card in the store is the same', () => {
			expect(proc.heap[0]).to.be.an('object').that.a.deep.equal(store.getState().cards.activeCard);
		})

		it.skip('card is beaten by defendant', () => {
			let card = makeAutoDefence(proc.players[1],proc.heap[0]);
			act(new Card(card));
			expect(card).to.be.an('object').that.has.all.keys('rank', 'suit','trump','username');
			

		})

		it.skip('if card is beaten by defendant, players are inverted',() => {
			
			if(proc.heap.length === 2){
				pick();
			}
			
			expect(store.getState().players.hit.name).to.equal(proc.players[1].name);
		})



		it('card is not beaten by defendant', () => {
			let card = makeAutoDefence(proc.players[1],proc.heap[0]);
			if(!card)hold();
			expect(card).to.be.a('null');
		})

		it('if card is not beaten, attacker takes one card from the deck',() => {
			pick();
			expect(proc.players[0].cards.length).to.equal(6);
			expect(proc.players[0].name).to.equal(store.getState().players.hit.name);
		})

		


		
	})

})



//MARK
describe('FINAL TEST',function(){
	
	
	it('game has began',  () => {

		let proc = store.getState().info.proc;
		let first;
		for(let player of proc.players)
			if(player.first)first = player;

		
		//cards was distributed
		//first player defined
		expect(first).to.be.an('object').that.has.any.keys('name','cards');
	})

	it('process finished with the winner', () => {

		let proc = store.getState().info.proc;
		//console.log(proc)
		let count = 0;

		let attacker,defendant;

		for(let i=0;i<proc.players.length;i++){
			if(proc.players[i].first){
				//defines attacker
				attacker = proc.players[i];
				//defines defendant
				if(i === (proc.players.length-1))
				defendant = proc.players[0];
				else defendant = proc.players[i+1];

				break;
			}
		}

		
		//start of the game
		while(count < 30){

			let {hit,beat} = store.getState().players;

			for(let player of proc.players){

				if(hit && player.name === hit.name)
					attacker = player;
				if(beat && player.name === beat.name)
					defendant = player;
			}
			

			let card = makeAutoAttack(attacker,proc.heap);
			console.log('attack card:'+card);
			if(card){

				act(new Card(card));
				let beatenCard = makeAutoDefence(defendant,card);
				if(beatenCard){
					act(new Card(beatenCard));
				}else{
					
					hold();
					pick();
					continue;
				}

			}else{
				pick();
			}

			count++;

		}

		let winner;
		for(let player of proc.players)
			if(player.winner)winner = player;
		console.log('attacker:'+proc.attacker.cards.length);
		console.log('defendant:'+proc.defendant.cards.length);
		console.log('deck:'+proc.deck.length);
		console.log('heap:'+proc.heap.length);
		expect(winner).to.be.an('object').that.a.deep.equal(store.getState().info.winner);

	})


	
})







