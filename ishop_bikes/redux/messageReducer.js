const initState={
    text: 'Добро пожловать!',
    key: 0
  }
  
  function messageReducer(state=initState,action) {
    switch (action.type) {
  
      case 'ORDER_MADE': {
        let newState={...state,
          text: 'Заказ оформлен успешно!!!',
          key: (state.key+1)
        };
        return newState;
      }
      case 'ALERT': {
        let newState={...state,
          text: action.text,
          key: (state.key+1)
        };
        return newState;
      }
      
      default:
        return state;
    }
  }
  
  export default messageReducer;
  