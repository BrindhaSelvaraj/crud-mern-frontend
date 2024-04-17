import { createStore, combineReducers } from 'redux';
import rootReducer from '../reducer/reducer';
import { userReducer } from '../reducer/reducer';


//using the combineReducers function to combine the two reducers declared and exported in the Reducer function
const store = createStore(combineReducers({project: rootReducer, user: userReducer}))

export default store;