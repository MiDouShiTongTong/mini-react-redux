import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/app';
// 引入 store
import store from './store';

ReactDOM.render(<App store={store}/>, document.getElementById('root'));

// state 发送变化重新渲染
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, document.getElementById('root'));
});
