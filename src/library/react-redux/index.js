import React from 'react';
import PropType from 'prop-types';

// 创建 context
const ReduxContext = React.createContext({
  store: null
});

// Provider 负责将 store 对象存储到 context 中
export class Provider extends React.Component {
  static propTypes = {
    store: PropType.object.isRequired
  };

  render() {
    const { props } = this;
    return (
      // 给子组件传递 context
      <ReduxContext.Provider value={{ store: props.store }}>
        {this.props.children}
      </ReduxContext.Provider>
    );
  }
}

// connect 负责将 state 和 action 映射到组件 的 props 中
/**
 *
 *
 * @param mapStateToProps array 用于确定属性
 * @param mapDispatchToProps object 用于确定函数(内部调用 dispatch 函数)
 */
export const connect = (mapStateToProps, mapDispatchToProps) => {
  // 返回一个函数
  /**
   * @param WrapComponent Component
   */
  return (WrapComponent) => {
    return class ConnectComponent extends React.Component {

      // 使用 context
      static contextType = ReduxContext;

      // 渲染完成后 监听 state
      componentDidMount = () => {
        // 得到 store
        const { store } = this.context;
        // 监听 state
        store.subscribe(() => {
          // 状态发生变化重新渲染
          this.setState({});
        });
      };

      /**
       * 对 mapDispatchToProps 进行封装 内部需要调用 dispatch
       *
       * @param mapDispatchToProps
       */
      bindActionCreators = (mapDispatchToProps) => {
        const { store } = this.context;
        return Object.keys(mapDispatchToProps).reduce((newMapDispatchToProps, actionName) => {
          newMapDispatchToProps[actionName] = (...args) => {
            // 添加 dispatch 调用
            store.dispatch(mapDispatchToProps[actionName](...args));
          };
          return newMapDispatchToProps;
        }, {});
      };

      render() {
        // 返回组件并且注入属性和函数
        return (
          <ReduxContext.Consumer>
            {
              context => {
                // 得到 store
                const { store } = context;
                // 获取属性对象
                const stateProps = mapStateToProps(store.getState());
                // 获取函数对象
                const dispatchProps = this.bindActionCreators(mapDispatchToProps);
                return (
                  <WrapComponent {...stateProps} {...dispatchProps}/>
                );
              }
            }
          </ReduxContext.Consumer>
        );
      };
    };
  };
};
