import { SET_REDIRECT_URL, LOGIN } from './actions.js';

const initialState = {
  loggedIn: false,
  currentURL: ""
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case SET_REDIRECT_URL:
      return {
        ...state,
        currentURL: action.url
      };
    case "LOGIN":
      return {
        ...state,
        loggedIn: true
      };
    default:
      return state
  }
}