export default function reducer(state = {}, action = {}){
	switch(action.type){
		case 'FORM_SENT': return {
			value: action.value,
			logged:action.logged
		}
		default: return state;
	}
}