import { LOGGED, LOGOUT } from '../constants';

const initialState = { 
  user: {}
 };

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LOGGED: 
       return {...state, user: action.user};
    case LOGOUT: 
       return {...state, user: {}};
    default: 
       return state;
    }
  }