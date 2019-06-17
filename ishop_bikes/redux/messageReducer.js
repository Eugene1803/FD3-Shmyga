const initState={
    text: '',
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
  
      
      default:
        return state;
    }
  }
  
  export default messageReducer;
  