import * as ActionTypes from '../actionTypes';


export const checkLoggedUser = (value) =>{
	return {
		type: ActionTypes.GET_LOGGED,
		logged:  value
	}
}

export const getGameOffers = (value) =>{
	return {
		type: ActionTypes.GET_OFFERS,
		offers:  value
	}
}

export const getGameStats = (value) =>{
	return {
		type: ActionTypes.GET_STATS,
		games:  value
	}
}

export const setGameTitle = (value) =>{
	return {
		type: ActionTypes.GAME_TITLE,
		title:  value
	}
}

export const getOpponent = (value) =>{ // OR RENDER OPPONENT
	return {
		type: ActionTypes.GET_OPPONENT,
		opponent:  value
	}
}

export const setGameProcess = (value) =>{
	return {
		type: ActionTypes.GAME_PROCESS,
		proc:  value
	}
}



export const renderCards = (value) =>{
	return {
		type: ActionTypes.CARD_RENDER,
		cards:  value.cards ,//|| state.cards,
		//rank:  value.rank,
		//suit:  value.suit,
		activeCard:  value.activeCard
	}
}



export const renderGameHistory = (value) =>{
	return {
		type: ActionTypes.GAME_HISTORY,
		history: value.history,
		gameSet: value.gameSet,
		currentStep:value.currentStep
		
	}
}

export const setPlayerAction = (value) =>{
	return {
		type: ActionTypes.PLAYER_ACT,
		beat:  value.beat,
		hit: value.hit,
		hold: value.hold,
		pick: value.pick,
		data: value.data,
	}
}

//types: TIMER,RESTART_TIMER,STOP_TIMER
export const setTimer = (type,value) => {
	return {
		type: type,
		timerValue: value
	}
}

export const setWinner = (value) => {
	return {
		type: ActionTypes.SET_WINNER,
		win:value.winner,
		winner: value.player,
		gameId:value.id
	}
}













