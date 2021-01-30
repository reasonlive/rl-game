import {store} from '../../../store';
import {setPlayerAction,setTimer,setWinner} from '../../../store/actions';


//player as attacker ends up the attack
	//and picks other cards from deck
export const pick = ()=>{

		let {players,info} = store.getState();
		let {beat,hit,hold} = players;

		

		let {gameSet,currentStep} = info;
		

		let {proc} = info;
		
		
		//checks if attacker exists
		if(!hit)return;

		let whoHit = hit.name,
			whoBeat = beat.name;

		//how many cards remains in the deck
		let cardsRemained = proc.getDeck() && proc.getDeck().length || 0;


		//store.dispatch({type:'PLAYER_ACT',pick:{name:hit.name}});
		store.dispatch(setPlayerAction({pick:{name:hit.name}}));

		
		if(hold){
			
			
			let picker = undefined;
			for(let player of proc.players){
				if(player.name === store.getState().players.pick.name)picker = player;
			}

			//give cards to picker
			let result = proc.distribute(picker);
			
			if(result && result.winner){
					
				//let url = window && window.document.location.href;
				//let id = url.slice( url.lastIndexOf('/')+1,url.length);
				//store.dispatch({type:'SET_WINNER',winner:true,player:result});
				store.dispatch(setWinner({winner:true,player:result}));
				return;
			}
			//store.dispatch({type:'PLAYER_ACT',hold:''});
			store.dispatch(setPlayerAction({hold:''}));
			
		}else{
			//give cards to both
			for(let player of proc.players){
				proc.distribute(player);
			}
			
			//reverse players
			whoHit = beat.name;
			whoBeat = hit.name;


			//store.dispatch({type:'PLAYER_ACT',hit:{name:whoHit},beat:{name:whoBeat}})
			proc.heap = [];
			
		}

		let mutatedHistory = info.history.concat([
				{gameSet:++gameSet,currentStep:0,name:'',step:''}

				]);

		store.dispatch(setPlayerAction(
				{hit:{name:whoHit},beat:{name:whoBeat},data:
				{history: mutatedHistory,gameSet:gameSet,currentStep:0,activeCard:''}}
				));

		//remove the active card from the table
		//store.dispatch({type:'CARD_RENDER', activeCard:''});
		store.dispatch(setTimer('RESTART_TIMER',30));
		
		
	}