const initialState = {
  loggedIn: false,
  currentUrl: "",
  isFetching: false
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case "SET_REDIRECT_URL":
      return {
        ...state,
        currentUrl: action.url
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
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        loggedIn: false,
        currentUrl: null
      };
    case "LOGOUT_FAILED":
      return {
        ...state,
        loggedIn: true
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