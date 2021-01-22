import {store} from '../../../store';
import {setPlayerAction,setTimer,setWinner} from '../../../store/actions';


//player as attacker ends up the attack
	//and picks other cards from deck
export const  pick = (e)=>{

		let {players,info} = store.getState();
		let {beat,hit,hold} = players;

		let {gameSet,currentStep} = info;
		

		let {proc} = info;
		
		
		//checks if attacker exists
		if(!hit)return;

		
		//how many cards remaines in the deck
		let cardsRemained = proc.getDeck() && proc.getDeck().length || 0;

		let descr = {
			name: hit.name,
			remain: cardsRemained
		}


		store.dispatch(setPlayerAction({pick:descr}));

		
		if(hold){
			
			let picker = proc.player1.name !== hold.name ? proc.player1 : proc.player2;

			//give cards to picker
			let result = proc.distribute(picker);
			
			if(result && result.winner){
					
				let url = window.document.location.href;
				let id = url.slice( url.lastIndexOf('/')+1,url.length);

				store.dispatch(setWinner({winner:proc.player1,id:id}));
				return;
			}
			store.dispatch(setPlayerAction({hold:''}));
		}else{
			//give cards to both
			proc.distribute(proc.player1);
			proc.distribute(proc.player2);

			//reverse players
			let whoHit = beat.name;
			let whoBeat = hit.name;

			let mutatedHistory = info.history.concat([
				{gameSet:++gameSet,currentStep:0,name:'',step:''}

				]);
			
			store.dispatch(setPlayerAction(
				{hit:{name:whoHit},beat:{name:whoBeat},data:{history: mutatedHistory,gameSet:gameSet,currentStep:0}}
				));
			
			//remove the active card from the table
			store.dispatch({type:'CARD_RENDER', activeCard:null});


		}
		
		/*if(cardsRemained < 2){

			let lastCard = proc.deck[0];
			let cards = {
				...store.getState().cards,
				lastCard
			}
			store.dispatch({type: 'CARD_RENDER', cards: cards});
			//store.dispatch({type: 'CHANGE_DECK', deck:null});
			proc.unsetDeck()
		}else{
			proc.distribute(proc.player1);
		}*/
		//store.dispatch({type:'TIMER_TICK',timerValue:30});

		
	}