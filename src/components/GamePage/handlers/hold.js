import {store} from '../../../store';
import {setPlayerAction,setTimer} from '../../../store/actions';

	//player does not reflect the attack
	//and takes away all the cards
export const  hold = (e)=>{

		let {cards,players,info} = store.getState();
		let {gameSet,currentStep} = info;
		 
		if(!players.beat)return;

		//the check for online game through websocket
		/*if(beat.name !== localStorage.getItem('name')){
			return;
		}*/

		let descr = {
			name: players.beat.name
		}

		store.dispatch(setPlayerAction({hold:descr}));

		let whoHold = info.proc.player1.name === players.beat.name ? info.proc.player1 : info.proc.player2;
		
		info.proc.takeHeap(whoHold);


		let mutatedHistory = info.history.concat([
				{gameSet:++gameSet,currentStep:0,name:'',step:''}

				]);


		let dataToChange = {
			history: mutatedHistory,
			cards: {
				...cards.cards,
			},

			gameSet: gameSet,
			currentStep:1
		}

		store.dispatch(setPlayerAction({data:dataToChange})); //pick must makes itself
		store.dispatch(setTimer('RESTART-TIMER',30));


		
}