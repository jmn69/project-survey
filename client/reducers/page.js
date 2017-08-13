import { NOT_FOUND } from 'redux-first-router';

export default (state = 'DASHBOARD', action = {}) =>
  components[action.type] || state

const components = {
  DASHBOARD: 'Dashboard',
  SETTINGS: 'Settings',
  SIGNIN: 'SignIn',
  SURVEYLIST: 'SurveyList',
  [NOT_FOUND]: 'NotFound'
};