import {store} from '../../../store';
import {setPlayerAction,setTimer,setWinner} from '../../../store/actions';


//action of player, beat or hit
export const act = (e) => {

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
					//store.dispatch({type:'PLAYER_ACT',hit:{name:username}});
					store.dispatch(setPlayerAction({hit:{name:username}}));
					
					let defendant;
					for(let player of proc.players){
						if(player.name !== username){
							defendant = player.name;
							break;
						}

					}
					
					//set the defendant name in the store
					//store.dispatch({type:'PLAYER_ACT',beat:{name:defendant}});
					store.dispatch(setPlayerAction({beat:{name:defendant}}));
					
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
				
				
				//checking whose step must be
				if(lastHeapCard && lastHeapCard.username === username){
					
					return;
				}

				if(!lastHeapCard && username === beat.name){
					//console.log('you must not move!');
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
					let add = false;

					for(let card of proc.heap){
						if(rank === card.rank){
							add = true;
							break;
						}
					}

					if(!add)return;
				}

				proc.intoHeap({rank,suit,trump,username});

				if(!proc.getDeck() && attacker.cards.length < 1){
					//store.dispatch({type:'SET_WINNER',winner:true,player:attacker});
					store.dispatch(setWinner({winner:true,player:attacker}));
					attacker.winner = true;
					return;
				}

				
			}
			

			//find the card of actor and take it from him
			//let whoseCards = proc.player1.name === username ? proc.player1.cards : proc.player2.cards;

			//delete card from player's hand
			//let ind = whoseCards.findIndex(item => item.rank === rank && item.suit === suit)
			//whoseCards.splice(ind,1);


			let mutatedHistory = info.history.concat([
				{gameSet:gameSet,currentStep:++currentStep,name:username,step:rank+'/'+suit}

				]);

				
	
		let dataToChange = {
			history: mutatedHistory,
			activeCard: {rank,suit,trump,username},
			gameSet:gameSet,
			currentStep:currentStep
			
		}
		//console.log(dataToChange)

		
		//store.dispatch({type:'PLAYER_ACT',data:dataToChange});
		//store.dispatch({type:'CARD_RENDER',activeCard:{rank,suit,trump,username}})
		store.dispatch(setPlayerAction({data:dataToChange}));
		//store.dispatch({type:'RESTART_TIMER',timerValue:30});
		
		//restart timer
		store.dispatch(setTimer('RESTART_TIMER',30));
		
	}

