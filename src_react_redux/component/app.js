import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { increment, incrementIfOdd, decrement, addMessage } from '../store/app';

export default connect(
  // mapStateToProps
  state => {
    return {
      count: state.app.count,
      messageList: state.app.messageList
    }
  },
  // mapDispatchToProps
  {
    increment,
    incrementIfOdd,
    decrement,
    addMessage
  }
)(
  class App extends Component {
    static propTypes = {
      increment: PropTypes.func.isRequired,
      incrementIfOdd: PropTypes.func.isRequired,
      decrement: PropTypes.func.isRequired,
      count: PropTypes.number.isRequired,
      addMessage: PropTypes.func.isRequired,
      messageList: PropTypes.array.isRequired
    };

    increment = () => {
      const { props, select } = this;
      props.increment(select.value * 1);
    };

    decrement = () => {
      const { props, select } = this;
      props.decrement(select.value * 1);
    };

    incrementIfOdd = () => {
      const { props, select } = this;
      console.log();
      props.incrementIfOdd(select.value * 1);
    };

    incrementAsync = () => {
      const { props, select } = this;
      setTimeout(() => {
        props.increment(select.value * 1);
      }, 1000);
    };

    addMessage = () => {
      const { props, input } = this;
      props.addMessage(input.value);
    };

    render() {
      const { props } = this;
      const { count, messageList } = props;
      console.log(messageList);
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
              props.messageList.map((message, index) => <li key={index}>{message}</li>)
            }
          </ul>
        </div>
      );
    }
  }
);
