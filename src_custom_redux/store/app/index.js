// action type
const INCREMENT = 'app/increment';
const DECREMENT = 'app/decrement';
const ADD_MESSAGE = 'app/addMessage';

// state
const initState = {
  count: 0,
  messageList: []
};

// reducer
export default (state = initState, action) => {
  console.log(state, action);
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        ...{
          count: state.count + action.data
        }
      };
    case DECREMENT:
      return {
        ...state,
        ...{
          count: state.count - action.data
        }
      };
    case ADD_MESSAGE:
      const { messageList } = state;
      messageList.push(action.data);
      return {
        ...state,
        ...{
          messageList
        }
      };
    default:
      return {
        ...state
      };
  }
}

// action
export const increment = (number) => {
  return {
    type: INCREMENT,
    data: number
  };
};

export const decrement = (number) => {
  return {
    type: DECREMENT,
    data: number
  };
};

export const addMessage = (message) => {
  return {
    type: ADD_MESSAGE,
    data: message
  };
};
