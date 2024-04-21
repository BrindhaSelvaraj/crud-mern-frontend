import { createStore, combineReducers } from 'redux';
import rootReducer from '../reducer/reducer';

const store = createStore(combineReducers({ project: rootReducer }));

export default store;
