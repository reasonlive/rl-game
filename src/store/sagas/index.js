import {call,put,take,takeEvery,fork,delay,all}  from 'redux-saga/effects';
import produce from 'immer';

import clientFetcher from '../../utils/fetcher';
import {
	checkLoggedUser,
	getGameOffers,
	getGameStats,
	getOpponent,
	setGameProcess,
	getGameTitle,
	renderCards,
	renderGameHistory,
	setPlayerAction,
	setTimer
} from '../actions';

function handleError(error){
	console.log('Warning! There is Error: '+error);
}


const fetcher = new clientFetcher();

//makes fetch through the redux-saga to check if user authenticated
function makeAsyncFetch(){
	return fetcher.checkSession().
	then(result => ({result})).
	catch(error => ({error}));
}

export function* getCheckAuth(){
	const {result,error} = yield call(makeAsyncFetch);
	console.log('from store/sagas '+result.logged)
	if(result) yield put(checkLoggedUser(result.logged));
	//if(error) yield call(handleError(error));
}

/////////////////////




//makes fetch through the redux-saga to get available offers 
async function getOffers(){
	let offers = await fetcher.fetchOffers();
	return offers;
}

export function* renderOffers(){
	let offers = yield call(getOffers);

	yield put(getGameOffers(offers))
}


////////////////////////


//makes fetch through the redux-saga to get finished games
async function getFinishedGames(){
	let data = await fetcher.fetchStat();
	return data;
}

export function* renderFinishedGames(){
	let games = yield call(getFinishedGames);
	yield put(getGameStats(games))
}



export function* renderOfferground(){
	yield fork(renderOffers);
	yield fork(renderFinishedGames);
}






//this func invokes when time is up and user make no step
function* overtimeHandler(store){
	let {players,info,cards} = store.getState();
	let {gameSet,currentStep} = info;
	let defendant = players.beat;
	console.log(defendant)
	let heapCards = info.proc.heap;
	let whoseCards = defendant.name === info.proc.player1.name ? 1 : 2;
	if(whoseCards > 1){
		info.proc.takeHeap(info.proc.player2)
		
	}else{
		info.proc.takeHeap(info.proc.player1)
		
	}

	store.dispatch(setPlayerAction({hold:{name:defendant.name}}))

	let preparedData = {
		
		cards:{
			...cards.cards
			
		},
		history: info.history.concat([
				{gameSet:++gameSet,currentStep:0,name:'',step:''}]),
		activeCard: '',
		gameSet:gameSet,
		currentStep:0
	}

	yield renderStep(preparedData);

}



//timer process
function* timerTick(store,init){

	let val = init;
	yield takeEvery('*', function(action){
		if(action.type == 'RESTART_TIMER'){
			
			init = val
			
		}
		if(action.type == 'STOP_TIMER'){
			init = -10;
		}

		if(action.type == 'SET_WINNER'){
			
			let {winner,gameId} = store.getState().info;
			console.log(gameId)
			//fetcher.updateGameData('end',gameId);
			init = -10;
			alert('WINNER IS '+winner.name);
		}
	})


	
	while(true){
		

		yield delay(1000)

		let v = yield put(setTimer('TIMER',init));

		if(store.getState().timer.timerValue < 0){
			yield put(setTimer('TIMER',0))
			break;
		}

		init = --store.getState().timer.timerValue;
		if(store.getState().timer.timerValue < 1){
			yield overtimeHandler(store);
			let restarted = yield put(setTimer('RESTART_TIMER',val));
			init = restarted.timerValue;
		}
		
	}
	
}


//watch for the player's actions
function* watchPlayers(){

	console.log('watch players')

	while(true){

		let {data} = yield take('PLAYER_ACT');
		if(data){
			yield fork(renderStep,data);
		}
		

		//if no data break
	}
}


function* renderStep(values){

	if(!values)return;
	let {activeCard,cards,history,currentStep,gameSet} = values;
	

	yield put(renderCards({activeCard,cards}));

	yield put(renderGameHistory({history,currentStep,gameSet}));

}


////////////////////////////////////////////////////////////////////////////

 function* takeOfferAndStart(opponent,cards){

	yield put(getOpponent(opponent));

	yield put(renderGameHistory({history:[],currentStep:0,gameSet:1}));

	yield put(renderCards({cards}));
}

 function* watchConnection(store){

	while(true){

		let {proc} = yield take('GAME_PROCESS');

		let cards = {
			player1: proc.player1.cards,
			player2: proc.player2.cards
		}

		yield fork(takeOfferAndStart, proc.player2, cards);
		break;
	

	}

	yield timerTick(store,30);

}





/*function* watchAndLog() {
  yield takeEvery('*', function* logger(action) {
    //const state = yield select()

	    switch(action.type){
	    	case 'RESTART_TIMER':{
	    		//console.log('timer restarted')
	    	};break;
	    	case 'TIMER': {
	    		console.log(action.timerValue)
	    	};break;

	    	case 'PLAYER_ACT':{
	    		yield put({type:'RESTART_TIMER',timerValue:30});
	    	};break;

	    	default: return null; 
	    }

  })
}*/
/*mysaga.run(watchAndLog);

mysaga.run(timerTick,store,30);
mysaga.run(watchPlayers);
mysaga.run(watchConnection);*/





//mysaga.run(root,{store:store,timer:30});
//console.log(store.getState())

export default function* root(store){
	yield all([
		
		fork(watchConnection,store),
		fork(watchPlayers)
	])
}
