/**
 * 自定义 redux
 *  createStore() 返回 store 对象
 *    getState() 获取所有 state 对象
 *    dispatch(action) 分发 action, 触发 render 调用, 返回新的 state, 调用所有绑定的 listener
 *    subscribe 订阅 state 监听器
 *
 *  combineReducers 合并多个 reducer 返回新的 reducer
 *
 */

// 返回 store 对象, 用于管理所有的 状态
export const createStore = (reducer) => {
  // 内部 state
  let state;
  // 内部 listenerList 素组
  let listenerList = [];

  // 第一次调用 reducer 初始化状态并保存
  state = reducer(state, {
    type: '@mini-redux'
  });

  // 获取内部 state
  const getState = () => state;

  // 调用 reducer 获取新的状态, 回调所有的 listener
  const dispatch = (action) => {
    // 调用 reducer, 得到新的 state
    state = reducer(state, action);

    // 回调所有的 listener
    listenerList.forEach(listener => listener());
  };

  // 订阅 state 监听器
  const subscribe = (listener) => {
    listenerList.push(listener);
  };

  return {
    getState, dispatch, subscribe
  };
};

// 接收一个或多个 reducer 函数, 返回新的 reducer
export const combineReducers = (reducers) => {
  return function (state = {}, action) {
    // 遍历所有 reducer, 得到 n 个新的状态, 封装成对象返回
    return Object.keys(reducers).reduce((newState, reducerName) => {
      newState[reducerName] = reducers[reducerName](state[reducerName], action);
      return newState;
    }, {});
  };
};
