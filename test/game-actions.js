//game-actions.js

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

function setPlayerAction(data){
	if(data.hit){
		return data.hit;
	}
	if(data.beat){
		return data.beat;
	}
	if(data.hold)return data.hold;
	if(data.pick)return data.pick;
	if(data.data)return data.data;
}

//REDUX STORE SIMULATOR
class store {

	static watchProc(){
		setInterval( () => {
			if(proc.players && this.players.data){
				this.cards.cards = {
					player1: proc.players[0].cards,
					player2: proc.players[1].cards
				}
				this.cards.activeCard = this.players.data.activeCard
				
			}

		},1)
	}

	static players = {
	hit: undefined,
	beat: undefined,
	hold: undefined,
	pick: undefined,
	data: undefined
	};

	static info = {
	proc: proc,
	gameSet: 0,
	currentStep:0
	};

	static timer = 30;
	static cards = {
		cards: undefined,
		activeCard: undefined
	}

	

	static getState(){
		return {
			players:this.players,
			info:this.info,
			timer:this.timer,
			cards: this.cards
		}
	}

	static dispatch(data){
		if(data.hit)this.players.hit = data.hit;
		if(data.beat)this.players.beat = data.beat;
		if(data.hold)this.players.hold = data.hold;
		if(data.pick)this.players.pick = data.pick;

		if(data.data)this.players.data = data.data;

		
		
	}
}

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
			console.log(cards)
			//return store.getState().cards;

			//game process object
			let {proc} = info;
			//return proc;

			//all current actions 
			let {hit,beat,hold,pick} = players;
			
			//return players;
			//if it first step
			if(!hit){
				let first = proc.player1.first ? proc.player1 : proc.player2;
				
				//return first;
				if(username !== first.name){
					return;
				}else{
					//set the attacker name in the store
					store.dispatch({hit:{name:username}});
					
					let defendant;
					for(let player of proc.players){
						if(player.name !== username){
							defendant = player.name;
							break;
						}

					}
					
					//set the defendant name in the store
					store.dispatch({beat:{name:defendant}});
					
					
					//put the card into heap, make it as an active card
					proc.intoHeap({rank,suit,trump})
				}
			//if it not the first step
			}else{
				//hit and beat values already exists
				let attacker = proc.player1.name === hit.name ? proc.player1 : proc.player2;
				let defendant =  proc.player1.name === beat.name ? proc.player1 : proc.player2;

				let lastHeapCard = activeCard;

				
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

				proc.intoHeap({rank,suit,trump});

				
			}
			

			//find the card of actor and take it from him
			let whoseCards = proc.player1.name === username ? proc.player1.cards : proc.player2.cards;

			//delete card from player's hand
			let ind = whoseCards.findIndex(item => item.rank === rank && item.suit === suit)
			whoseCards.splice(ind,1);


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

		
		store.dispatch({data:dataToChange});
		
		//restart timer
		//store.dispatch(setTimer('RESTART_TIMER',30));
		
	}


	function makeAutoAttack(player,heap){

		//console.log(player.name + " is hit");
		let cards = player.cards;


		let whichCard = undefined;

		for(let card of cards){
			if(!heap){
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

			if(cards.length < 2 && !proc.getDeck()){
				player.winner = true;
			}

			return {
				...whichCard,
				username: player.name
			}
		}else{
			return null;
		}

		

	}





































describe('check how setPlayerAction works',  () => {
	it('returns hit property', () => {
		expect(setPlayerAction({hit:{name:'heel'}})).to.be.an('object').that.has.property('name','heel');
	})

	//setPlayerAction is not working in that situation, 
	//arguments in method dispatch() will be given by direct way
	it('write hit property into store object',  () => {
		//store.dispatch(setPlayerAction({hit:{name:'heel'}}));
		store.dispatch({hit:{name:'heel'}});
		let hit = store.getState().players.hit;
		expect(hit).to.be.an('object').that.has.property('name','heel');
	})
})

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


describe('TESTING act.js',  () => {

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

		let hit = store.getState().players.hit;
		it('hit is not made yet',  () => {
			expect(hit).to.equal(undefined);
		})

		let proc = store.getState().info.proc;
		console.log(proc.players)

		it('defines first player named "hello" as a beginner', () => {
			
			expect(proc.players[0]).to.has.property('first');
		})

		it('write HIT action in the store',  () => {

			let data = makeAutoAttack(proc.players[0]);
			
			act(new Card(data));
			//store.dispatch({hit:{name:'hello'}});
			hit = store.getState().players.hit;
			expect(hit).to.be.an('object').that.has.property('name','hello');
		})

		it('write BEAT action in the store',  () => {
			//act(card);
			store.dispatch({beat:{name:'world'}});
			let beat = store.getState().players.beat;
			expect(beat).to.be.an('object').that.has.property('name','world');
		})

		it('adding card into heap',  () => {
			let proc = store.getState().info.proc;
			expect(proc.heap[0]).to.be.an('object').that.has.all.keys('rank','suit','trump');
		})

		it('defines which card is into heap and takes away it from user',  () => {
			let user = store.getState().info.proc.players[0];
			expect(user.cards).to.be.an('array').that.has.lengthOf(5);
		})

	})

	

})







