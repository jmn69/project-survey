import routesMap from './routesMap';

export const isServer = typeof window === 'undefined';

export const isAllowed = (type, state) => {
  const role = routesMap[type] && routesMap[type].role // you can put arbitrary keys in routes
  if (!role) return true;
  return state.app.loggedIn;
}

export const getQuestionComponentNameByType = (type) => components[type];

const components = {
  RADIOSINGLE: 'RadioSingle',
  RADIOMULTIPLE: 'RadioMultiple',
  CHECKSINGLE: 'CheckSingle',
  CHECKMULTIPLE: 'CheckMultiple',
  INPUTSINGLE: 'InputSingle'
};