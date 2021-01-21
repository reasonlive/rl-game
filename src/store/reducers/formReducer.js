export default function reducer(state = {}, action = {}){
	switch(action.type){
		case 'CHECK_LOGGED': return {
			logged:action.logged
		}
		
		default: return state;
	}
}