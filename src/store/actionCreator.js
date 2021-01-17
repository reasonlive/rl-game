import {FORM_SENT} from './actionTypes';

export function formActionCreator(newState){
	return {
		type: FORM_SENT,
		value: newState
	}
}
