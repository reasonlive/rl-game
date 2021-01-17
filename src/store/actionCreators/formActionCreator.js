import {FORM_SENT} from '../actionTypes';

export default  (newState) => ({
	type: FORM_SENT,
	value: newState
})