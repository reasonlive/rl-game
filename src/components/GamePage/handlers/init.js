import {store,sagaMiddleWare} from '../../../store';
import {setGameTitle,setTimer,setGameProcess} from '../../../store/actions';
import GameProcess from '../../../utils/GameProcess';
import gameSaga from '../../../store/sagas';

sagaMiddleWare.run(gameSaga,store);

//initialize game after connecting to the game table
export const  initGame = () => {

		if(localStorage.getItem('singleMode')){
				
				//localStorage.setItem('singleMode', true);
				
		
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
				//there is need to be a tip about first player
				let first = Process.setFirst(Process.getDeck('0').suit);
				console.log(first);

				//save process into the store
				store.dispatch(setGameProcess(Process));

				//get date for rendering
				let date = new Date();
				let now = date.getDate()+'.0'+(date.getMonth()+1)+'.'+date.getFullYear()+'/'+
				date.getHours()+':'+date.getMinutes();

				//get players for rendering
				let players = [Process.players[0].name, Process.players[1].name];
				store.dispatch(setGameTitle({players:players,startDate:now}));

				let modalWin = window.document.getElementsByClassName('msg')[0];

				modalWin.innerHTML = `${first.name} is attacking first!`;

				setTimeout( () => {modalWin.style.display = 'none';},3000);

				
				
		}else{

			localStorage.removeItem('singleMode');

			




		}
}

