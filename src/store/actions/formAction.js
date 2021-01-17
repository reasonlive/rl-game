import {FORM_SENT} from '../actionTypes';

export default function handleForm(values){
	return {
		type: FORM_SENT,
		value: values,
		logged: true
	}
}