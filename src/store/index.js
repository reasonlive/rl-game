import {createStore} from 'redux';
import reducer from './reducers/formReducer';
const store = createStore(reducer);

export default store;