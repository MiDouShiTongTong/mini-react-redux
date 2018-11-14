// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers } from '../library/redux';
import app from './app/index';

// 暴露 store
export default createStore(
  // 封装多个 reducer
  combineReducers({
    app
  })
);
