import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import DeviceReducer from './deviceSlice';

const reducer = combineReducers({
  // here we will be adding reducers
  device: DeviceReducer,
});

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
