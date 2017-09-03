import { NOT_FOUND } from 'redux-first-router';
import routesMap from '../routesMap';
import API from '../api';

export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SET_REDIRECT_URL = 'SET_REDIRECT_URL';
export const REQUEST_BEGIN = 'REQUEST_BEGIN';
export const REQUEST_END = 'REQUEST_END';

export const setRedirectUrl = url => {
  return {
    type: SET_REDIRECT_URL,
    url
  }
}

export const goTo = (url) => {
  let type = NOT_FOUND;
  for (var propertyName in routesMap) {
    if (routesMap[propertyName].path === url) {
      type = propertyName;
      break;
    }
  }
  return {
    type: type
  }
}

export const goToPage = (type, payload) => {
  return {
    type,
    payload: payload
  }
}

export const authentication = (payload) => {
  return dispatch => {
    dispatch(requestBegin());
    return API.authentication(payload)
      .then(json => {
        if (json.success)
          dispatch(loginSuccess());
        else
          dispatch(loginFailed());
        dispatch(requestEnd());
        return json;
      })
      .catch(error => { console.log('request failed', error); })
  }
}

export const signOut = () => {
  return dispatch => {
    dispatch(requestBegin());
    return API.logout()
    .then(json => {
      if (json.success)
        {
        dispatch(logoutSuccess());
        dispatch(goToPage('SIGNIN'));
        }
      else
        dispatch(logoutFailed());
      dispatch(requestEnd());
      return json;
    })
      .catch(error => { console.log('request failed', error); })
  }
}

export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
  }
}

export const loginFailed = () => {
  return {
    type: LOGIN_FAILED
  }
}

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

export const logoutFailed = () => {
  return {
    type: LOGOUT_FAILED
  }
}


export const requestBegin = () => {
  return {
    type: REQUEST_BEGIN
  }
}

export const requestEnd = () => {
  return {
    type: REQUEST_END
  }
}

export const authenticate = () => {
  return dispatch => {
    dispatch(requestBegin());
    return API.authenticate()
      .then(json => {
        if (json.authenticated)
          dispatch(loginSuccess());
        else
          dispatch(loginFailed());
        dispatch(requestEnd());
        return json.authenticated;
      })
      .catch(error => { console.log('request failed', error); })
  }
}