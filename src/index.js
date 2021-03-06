import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/app';
// 引入 store
import store from './store';
// 引入 Provider
import { Provider } from './library/react-redux';


ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
