import { SET_REDIRECT_URL } from './actions.js';

const initialState = {
  loggedIn: false,
  currentURL: "",
  isFetching: false
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case SET_REDIRECT_URL:
      return {
        ...state,
        currentURL: action.url
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loggedIn: true
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        loggedIn: false
      };
    case "REQUEST_BEGIN":
      return {
        ...state,
        isFetching: true
      };
    case "REQUEST_END":
      return {
        ...state,
        isFetching: false
      };
    default:
      return state
  }
}