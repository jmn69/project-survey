import { NOT_FOUND } from 'redux-first-router';
import routesMap from '../routesMap';

const LOGIN_FAILED = 'LOGIN_FAILED';
const SET_REDIRECT_URL = 'SET_REDIRECT_URL';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const REQUEST_BEGIN = 'REQUEST_BEGIN';
const REQUEST_END = 'REQUEST_END';
// try dispatching these from the redux devTools

export const goToPage = (type, category) => ({
  type,
  payload: category && { category }
})

export const goToDashboard = () => ({
  type: 'DASHBOARD'
})

export const goToSettings = () => ({
  type: 'SETTINGS'
})

export const notFound = () => ({
  type: NOT_FOUND
})

export const goToSignin = () => ({
  type: 'SIGNIN'
})

export const goToSurveylist = () => ({
  type: 'SURVEYLIST'
})

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

export const authentication = (payload) => {
  return dispatch => {
    dispatch(requestBegin());
    return fetch('/authentication', {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(payload),
      headers: { 'content-type': 'application/json' },
    })
      .then(res => { return res.json(); })
      .then(json => {
        if (json.success)
          dispatch(loginSuccess());
        else
          dispatch(loginFailed());
        dispatch(requestEnd());
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

function requestBegin() {
  return {
    type: REQUEST_BEGIN
  }
}

function requestEnd() {
  return {
    type: REQUEST_END
  }
}

export const authenticate = () => {
  return dispatch => {
    dispatch(requestBegin());
    return fetch('/authenticate', {
      method: 'GET',
      credentials: "same-origin",
      headers: { 'content-type': 'application/json' },
    })
      .then(response => response.json())
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