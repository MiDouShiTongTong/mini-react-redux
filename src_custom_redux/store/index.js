import { createStore, combineReducers } from '../library/redux';
import app from '../store/app';

export default createStore(
  combineReducers({
    app
  })
);
