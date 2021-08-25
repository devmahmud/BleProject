import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import UserReducer from './users';

const reducer = combineReducers({
  // here we will be adding reducers
  user: UserReducer,
});

const store = configureStore({
  reducer,
});

export default store;
