import {store} from '../../../store';
import {setPlayerAction,setTimer} from '../../../store/actions';


//action of player, beat or hit
export const  act = (e) => {

		let {players,info,timer} = store.getState();
		

		//which card was clicked on
		let {rank,suit,trump,username} = e.target.dataset;
			
			//number of set in the queue,
			let {gameSet,currentStep} = info;
			console.log(currentStep)			

			//cards from store,
			let {cards,activeCard} = store.getState().cards;

			//game process object
			let {proc} = info;

			//all current actions 
			let {hit,beat,hold,pick} = players;
			

			//if it first step
			if(!hit){
				let first = proc.player1.first ? proc.player1 : proc.player2;
				
				if(username !== first.name){
					return;
				}else{
					//set the attacker name in the store
					store.dispatch(setPlayerAction({hit:{name:username}}));
					let defendant;
					for(let player of proc.players){
						if(player.name !== username){
							defendant = player.name;
							break;
						}

					}
					
					//set the defendant name in the store
					store.dispatch(setPlayerAction({beat:{name:defendant}}));
					
					
					//put the card into heap, make it as an active card
					proc.intoHeap({rank,suit,trump})
				}
			//if it not the first step
			}else{
				//hit and beat values already exists
				let attacker = proc.player1.name === hit.name ? proc.player1 : proc.player2;
				let defendant =  proc.player1.name === beat.name ? proc.player1 : proc.player2;

				let lastHeapCard = activeCard;

				console.log('attacker'+attacker.name);
				console.log('def'+defendant.name);
				console.log(store.getState().info.history);
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


			let mutatedHistory = info.history.concat([
				{gameSet:gameSet,currentStep:++currentStep,name:username,step:rank+'/'+suit}

				]);
	
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

		
		store.dispatch(setPlayerAction({data:dataToChange}));
		console.log(store.getState().info.history)
		//restart timer
		store.dispatch(setTimer('RESTART_TIMER',30));
		
	}

