import {store,sagaMiddleWare} from '../../../store';
import {setGameTitle,setTimer,setGameProcess} from '../../../store/actions';
import GameProcess from '../../../utils/GameProcess';
import gameSaga from '../../../store/sagas';

sagaMiddleWare.run(gameSaga,store);

//initialize game after connection of second player
export const  initGame = (singleMode) => {

		if(singleMode){
				localStorage.setItem('name', 'hello');  //remove after testing
				localStorage.setItem('singleMode', true);
				
		
				let op = {
					name: 'Oleg',
					wins:10,
					losses:4
				}

				//starts process
				const Process = new GameProcess({name:'hello'}, op);
				//shuffle card deck
				Process.shuffle();
				//card distribution to both of users
				Process.distribute(null,true);
				//defines who is first attacker
				console.log(Process.setFirst(Process.getDeck('0').suit));

				//save process into the store
				store.dispatch(setGameProcess(Process));

				//get date for rendering
				let date = new Date();
				let now = date.getDate()+'.0'+(date.getMonth()+1)+'.'+date.getFullYear()+'/'+
				date.getHours()+':'+date.getMinutes();

				//get players for rendering
				let players = [Process.players[0].name, Process.players[1].name];
				store.dispatch(setGameTitle({players:players,startDate:now}));

				//@args
				//first: opponent(second player), second: game cards
				let allCards = {
					player1: Process.player1.cards,
					player2:Process.player2.cards
				}

				
				console.log(store.getState())

				

				
		}else{

			/*const Process = new GameProcess('hello', op.name);
				Process.shuffle();
				Process.distribute(null,true);
				store.dispatch({type:"SET_PROCESS", Process: Process});

				//set date to the history table title
				let date = new Date();
				let now = date.getDate()+'.0'+(date.getMonth()+1)+'.'+date.getFullYear()+'/'+
				date.getHours()+':'+date.getMinutes();
				store.dispatch({type:"SET_GAME_TITLE",title: {players:['hello'],startDate:now}});

				let allCards = {
					player1: Process.player1.cards,
					player2:Process.player2.cards
				}

				sagaMiddleWare.run(takeOfferAndStart,op,Process.player1.cards);
				startTimer();
*/
		




		}
}

