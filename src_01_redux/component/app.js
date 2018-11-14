import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { increment, decrement, addMessage } from '../store/app';

class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  increment = () => {
    const { props, select } = this;
    props.store.dispatch(increment(select.value * 1));
  };

  decrement = () => {
    const { props, select } = this;
    props.store.dispatch(decrement(select.value * 1));
  };

  incrementIfOdd = () => {
    const { props, select } = this;
    const { count } = props.store.getState().app;
    if (count % 2 === 1) {
      props.store.dispatch(increment(select.value * 1));
    }
  };

  incrementAsync = () => {
    const { props, select } = this;
    setTimeout(() => {
      props.store.dispatch(increment(select.value * 1));
    }, 1000);
  };

  addMessage = () => {
    const { props, input } = this;
    props.store.dispatch(addMessage(input.value));
  };

  render() {
    const { props } = this;
    const { count, messageList } = props.store.getState().app;
    return (
      <div className="App">
        <p>count: {count}</p>
        <p>
          <select ref={select => this.select = select}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button onClick={this.increment}>+</button>
          <button onClick={this.decrement}>-</button>
          <button onClick={this.incrementIfOdd}>increment if odd</button>
          <button onClick={this.incrementAsync}>increment async</button>
        </p>
        <hr/>
        <input type="text" ref={input => this.input = input}/>
        <button onClick={this.addMessage}>add</button>
        <ul>
          {
            messageList.map((message, index) => <li key={index}>{message}</li>)
          }
        </ul>
      </div>
    );
  }
}

export default App;
