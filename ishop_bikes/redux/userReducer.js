//import { COUNTRIES_LOADING, COUNTRIES_ERROR, COUNTRIES_SET } from './countriesAC';

const initState={
  user: null,
  basket: {},
  popUpState:{registration: false, logIn: false, basket: false, cabinet: false},
  allUsers:null,
}
function userReducer(state=initState,action) {
  switch (action.type) {

    case 'POP_UP': {
      let newState={...state,
      popUpState: action.popUpState
      };
      return newState;
    }
    case 'ALL_USERS_INFO_LOADED': {
      let newState={...state,
      allUsers: action.allUsers
      };
      return newState;
    }
    case 'CHANGE_BASKET' : {
      let newState = {...state,
        basket: action.basket
      }
      return newState;
    }
    case "ADD_TO_BASKET": {
        let newState = {...state};
        let newBasket = newState.basket;
        let itemId = action.item.id;
        if(itemId in newBasket){
          if(newBasket[itemId].quantity < action.item.quantity){
            newBasket[itemId].quantity++;
          } else {
            return state;
          }
        }
        else {
            newBasket[itemId] = {item: action.item, quantity: 1}
        }
        return newState; 
    } 
    case 'NEW_USER_REGISTERED': {
      let newState = {...state,
        popUpState:{registration: false, logIn: false, basket: false,cabinet: false},
        user: action.user
      }
      return newState;
    }
    case 'ORDER_MADE': {
      let newState = {...state,
        basket: {},
        popUpState:{registration: false, logIn: false, basket: false,cabinet: false},
      }
      return newState;
    }
    case 'LOG_OUT': {
      let newState = {...state, user: null,popUpState:{registration: false, logIn: false, basket: false,cabinet: false}};
      return newState;
    }

    case 'LOG_IN': {
      let newState = {...state, user: action.user,popUpState:{registration: false, logIn: false, basket: false,cabinet: false}};
      return newState;
    }
    case "UPDATE_USER": {
      let newState = {...state,
        user: action.updatedUser
      }
      return newState;
    }
    case "ORDER_MADE": {
      let newState = {...state,
        basket:{}
      }
      return newState;
    }
    default:
      return state;
  }
}

export default userReducer;
