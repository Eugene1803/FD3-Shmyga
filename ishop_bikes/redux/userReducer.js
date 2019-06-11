//import { COUNTRIES_LOADING, COUNTRIES_ERROR, COUNTRIES_SET } from './countriesAC';

const initState={
  user: null,
  basket: [],
  popUpState:{registration: false, logIn: false, basket: false},
  allUsers:null
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
      console.log('wefwefwefwefwefwef');
      let newState={...state,
      allUsers: action.allUsers
      };
      return newState;
    }
    
    
    default:
      return state;
  }
}

export default userReducer;
