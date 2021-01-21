export default function reducer(state = {}, action = {}){

	switch(action.type){
		case 'CHECK_LOGGED': return {
			value: action.value,
			logged:action.logged
		};
		case 'GET_OFFERS': return {
			...state,
			offers: action.offers
		};
		case 'GET_GAMES_INFO': return {
			...state,
			games:action.games
		};
		case 'TIMER_TICK': return {
			...state,
			timerValue: action.timerValue
		};





		case 'CREATE_OFFER': return{ ///not need
			...state,
			offers: state.offers.concat([action.offer])
		}

		
		case 'TAKE_OFFER': return { 
			...state,
			userData: action.userData
		};
		case 'CANCEL_OFFER': return {
			...state,
			offers: action.offers
		};
		
		//beat hit hold pick
		case 'PLAYER_ACT': return {
			...state,
			act: state.act.concat([action.act])
		};
		
		case 'CARD_RENDER': return {
			rank:action.rank,
			suit:action.suit
		};

		
		case 'GET_MOVE_HISTORY': return{
			...state,
			history: state.history.concat([action.history])
		}
		/*case 'GET_USER_INFO': return {
			...state,
			user:action.user
		};*/

		case 'GAME_OVER': return {
			...state,
			games: action.games
		};


		default: return state;
	}
}