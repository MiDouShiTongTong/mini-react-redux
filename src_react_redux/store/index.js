import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import app from './app/index';

// 暴露 store
export default createStore(
  // 封装多个 reducer
  combineReducers({
    app
  }),
  composeWithDevTools(applyMiddleware())
);
