import { applyMiddleware, createStore, compose } from 'redux';
import createHistory from 'history/createMemoryHistory';
import { connectRoutes } from 'redux-first-router';
import routesMap from '../client/routesMap';

const setup = (
  path = '/',
  options = { title: 'title', location: 'location' }
) => {

  const history = createHistory({
    initialEntries: [path],
    initialIndex: 0,
    keyLength: 6
  })

  const tools = connectRoutes(history, routesMap, options)
  return { ...tools, routesMap }
}

export default setup

export const setupAll = (path, options, rootReducer, preLoadedState) => {
  const tools = setup(path, options)
  const { middleware, reducer, enhancer } = tools
  const middlewares = applyMiddleware(middleware)
  const enhancers = compose(enhancer, middlewares)

  rootReducer =
    rootReducer ||
    ((state = {}, action = {}) => ({
      location: reducer(state.location, action),
      title: action.type
    }))

  const store = createStore(rootReducer, preLoadedState, enhancers)
  return {
    ...tools,
    store
  }
}