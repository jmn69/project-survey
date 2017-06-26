const initialState = {
  loggedIn: false,
  currentURL: ""
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case 'SET_REDIRECT_URL':
      return Object.assign({}, state, {
        currentURL: action.url
      })
    default:
      return state
  }
}