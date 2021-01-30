import {store} from '../../../store';
import {setPlayerAction,setTimer} from '../../../store/actions';

	//player does not reflect the attack
	//and takes away all the cards
export const hold = ()=>{

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

		//store.dispatch({type:'PLAYER_ACT',hold:{name:players.beat.name}});
		store.dispatch(setPlayerAction({hold: {name:players.beat.name}}));

		let whoHold = undefined;
		for(let player of info.proc.players){
			if(player.name === players.beat.name)whoHold = player;
		}
		
		info.proc.takeHeap(whoHold);


		let mutatedHistory = info.history.concat([
				{gameSet:++gameSet,currentStep:0,name:'',step:''}

				]);


		let dataToChange = {
			history: mutatedHistory,
			activeCard: '',
			gameSet: gameSet,
			currentStep:1
		}
		
		store.dispatch({type:'CARD_RENDER', activeCard:''});
		//store.dispatch(setPlayerAction({data:dataToChange})); //pick may be invoked automatically
		store.dispatch(setTimer('RESTART-TIMER',30));	
}