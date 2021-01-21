import {combineReducers} from 'redux';


export const timer = (state={},action={}) =>{
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


export const players = (state={},action={}) => {

	switch(action.type){

		case 'PLAYER_ACT': return {
			...state,
			beat: action.beat || state.beat,
			hit: action.hit || state.hit,
			hold: action.hold || state.hold,
			pick: action.pick || state.pick,
			data: action.data,
		};
		default:return state;
	}
}

export const cards = (state={},action={}) => {
	switch(action.type){
		case 'CARD_RENDER': return {
			...state,
			cards: action.cards || state.cards,
			activeCard: action.activeCard,
							
		};
		default: return state;
	}
}






export const info = (state = {history:[]}, action = {}) => {
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
			opponent: action.opponent
							
		};
		case 'GET_LOGGED': return {
			...state,
			logged:action.logged
							
		};
		case 'GAME_TITLE': return {
			...state,
			title: action.title,

		}
		case 'GAME_PROCESS': return {
			...state,
			proc: action.proc
		}

		case 'GAME_HISTORY': return {
			...state,
			history: action.history,
			gameSet: action.gameSet,
			currentStep: action.currentStep
		}


		default: return state;
	}
}


export default combineReducers({timer,players,cards,info});

