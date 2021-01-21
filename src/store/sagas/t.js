const {createStore,applyMiddleware,combineReducers} = require('redux');


const saga = require('redux-saga');
const {take,takeEvery,put,call,fork,delay,select,all} = require('redux-saga/effects');


const timer = (state={},action={}) =>{
	switch(action.type){
		case "TIMER": return {
			...state,
			timerValue: action.timerValue
		};
		case 'RESTART_TIMER': return{
			timerValue: action.timerValue
		};

		case 'STOP_TIMER': return{
			...state,
			timerValue: -1
		};
		default: return state;

	}
}



const player = (state={},action={}) => {

	switch(action.type){

		case 'PLAYER_ACT': return {
			...state,
			beat: action.beat || state.beat,
			hit: action.hit || state.hit,
			hold:action.hold,
			pick: action.pick
		};
		default:return state;
	}
}

const cards = (state={},action={}) => {
	switch(action.type){
		case 'CARD_RENDER': return {
			...state,
			cards: action.cards || state.cards,
			activeCard: action.activeCard,
							
		};
		default: return state;
	}
}

const history = (state={},action={}) => {
	switch(action.type){
		case 'GAME_HISTORY': return {
			...state,
			history: state.history ? state.history.concat([action.history]) : [],
			gameSet: action.set,
			currentStep: action.step
							
		};
		default: return state;
	}
}




const info = (state = {}, action = {}) => {
	switch(action.type){
		case 'GET_OFFERS': return {
			...state,
			cards: action.cards || state.cards,
			activeCard: action.activeCard,
							
		};
		case 'GET_STATS': return {
			...state,
			cards: action.cards || state.cards,
			activeCard: action.activeCard,
							
		};
		case 'GET_OPPONENT': return {
			...state,
			cards: action.cards || state.cards,
			activeCard: action.activeCard,
							
		};
		case 'GET_LOGGED': return {
			...state,
			logged:action.logged
							
		};
		case 'GAME_TITLE': return {
			...state,
			tableTitle: action.title
		}
		case 'GAME_PROCESS': return {
			...state,
			proc: action.proc
		}

		default: return state;
	}
}



const mysaga = saga.default();
const reducers = combineReducers({timer,player,cards,info,history});
const store = createStore(reducers, applyMiddleware(mysaga));

function rest(){
	return{
		type:'RESTART_TIMER',
		timerValue: 50
	}
}


function* timerTick(store,init){
	let val = init;
	yield takeEvery('*', function(action){
		if(action.type == 'RESTART_TIMER'){
			//console.log('restated')
			init = val
			
		}
		if(action.type == 'STOP_TIMER'){
			init = 0;
		}
	})


	
	
	while(true){
		

		yield delay(100)

		let v = yield put({type:'TIMER',timerValue:init});


		init = --store.getState().timer.timerValue;
		if(store.getState().timer.timerValue < 0){
			break;
			//OR/AND HOLD ACTION
			/*let data = {
				cards: {
					...store.getState().cards.cards
				},
				history:{
					set: gameSet,
					n: ++currentStep,
					name: username,
					step: rank+'/'+suit
				}
			}
			let restarted = yield renderStep(data)*/
			//init = restarted.timerValue;
		}

		if(store.getState().timer.timerValue < 10){
			yield put({type:'PLAYER_ACT', hit:'haha'});
		}
		
	}
	
}

function* watchPlayers(state){

	while(true){

		let {beat,hit,hold,pick,data} = yield take('PLAYER_ACT');
		yield fork(renderStep,data);
		//if no data break
	}
}


function* renderStep(values){

	if(!values)return;
	let {activeCard,cards,history,set,step} = values;
	
	yield put({type:'CARD_RENDER',activeCard:activeCard,cards:cards});
	yield put({type:'GAME_HISTORY',history:history,set:set,step:step});

}


////////////////////////////////////////////////////////////////////////////

 function* takeOfferAndStart(opponent,cards){

	yield put({type:'GET_OPPONENT',opponent:opponent});

	yield put({type:'GAME_HISTORY',set:1,step:0});

	yield put({type:'CARD_RENDER',cards:cards});
}

 function* watchConnection(){

	while(true){

		let {proc} = yield take('GAME_PROCESS');

		let cards = {
			player1: {card:'card1',card2:'card2'},
			player2: {card:'card1', card2:'card2'}
		}

		yield fork(takeOfferAndStart,'vova', cards);
		break;
	

	}



	//yield delay(100);

	console.log(store.getState().cards);

}





function* watchAndLog() {
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
	    		console.log('was player act')
	    		yield put({type:'STOP_TIMER'})
	    	};break;

	    	default: return null; 
	    }

  })
}



//store.applyMiddleWare(mysaga);

mysaga.run(timerTick,store,30);
mysaga.run(watchPlayers,store);
mysaga.run(watchAndLog);
mysaga.run(watchConnection);





//mysaga.run(root,{store:store,timer:30});
//console.log(store.getState())

/*function* root({store,timer}){
	yield all([
		fork(timerTick,store,timer),
		fork(watchAndLog)
	])
}*/

/*export default function* root() {
  yield all([
    fork(watchNavigate),
    fork(watchLoadUserPage),
    fork(watchLoadRepoPage),
    fork(watchLoadMoreStarred),
    fork(watchLoadMoreStargazers)
  ])
}*/