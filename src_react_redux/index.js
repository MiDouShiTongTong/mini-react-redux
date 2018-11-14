import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/app';
// 引入 store
import store from './store';
// 引入 Provider
import { Provider } from 'react-redux';


ReactDOM.render(
  <Provider store={store}>
    <App store={store}/>
  </Provider>,
  document.getElementById('root')
);
