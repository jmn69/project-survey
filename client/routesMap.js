import { redirect, NOT_FOUND } from 'redux-first-router';
import { fetchData } from './utils';

export default {
  SURVEYLIST: {
    path: '/surveylist',
    role: 'admin'
  },
  SETTINGS: {
    path: '/settings',
    role: 'admin'
  },
  SIGNIN: '/signin',
  DASHBOARD: {
    path: '/',
    role: 'admin'
  },
  SURVEY: {
    path: '/survey/:id'
  }
};