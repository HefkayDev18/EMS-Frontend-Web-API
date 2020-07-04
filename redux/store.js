import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from './rootReducer';

let middlewares = [thunk, logger];

if(process.env.NODE_ENV==='production'){
  middlewares = [thunk]
}

const store =  createStore(rootReducer,applyMiddleware(...middlewares));

export default store;