const LOGIN = 'LOGIN';
const SET_REDIRECT_URL = 'SET_REDIRECT_URL';

export const setRedirectUrl = url => {
  return {
    type: SET_REDIRECT_URL,
    url
  }
}

export const login = () => {
  return {
    type: LOGIN
  }
}