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
	console.log(offers)
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
	console.log(games)
	yield put(getGameStats(games))
}



export function* renderOfferground(){
	yield fork(renderOffers);
	yield fork(renderFinishedGames);
}


/////////////// //renderOffers and renderFinishedGames launches in one place at a time
///////////////////////////////////////////////////////////////////////////////////////



function* timerTick(store,init){

	let val = init;
	yield takeEvery('*', function(action){
		if(action.type == 'RESTART_TIMER'){
			
			init = val
			
		}
		if(action.type == 'STOP_TIMER'){
			init = 0;
		}
	})


	
	while(true){
		

		yield delay(1000)

		let v = yield put(setTimer('TIMER',init));

		if(store.getState().timer.timerValue < 10){
			
		}

		init = --store.getState().timer.timerValue;
		if(store.getState().timer.timerValue < 1){
			let restarted = yield put(setTimer('RESTART_TIMER',val));
			init = restarted.timerValue;
		}
		
	}
	
}

function* watchPlayers(){

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
