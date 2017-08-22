import createHistory from 'history/createMemoryHistory';
import { NOT_FOUND } from 'redux-first-router';
import configureStore from '../client/configureStore';
import {setRedirectUrl} from '../client/actions';

export default async (req, res) => {
  // console.log("auth : " + req.isAuthenticated())
  // console.log("path: " + req.session.currentUrl);
  const preLoadedState = { 
    app: { 
      loggedIn: req.isAuthenticated(),
      currentUrl: req.session.currentUrl
    } 
  };
  const history = createHistory({ initialEntries: [req.path] });
  const { store, thunk } = configureStore(history, preLoadedState);

  let location = store.getState().location;
  if (doesRedirect(location, res, req)) return false;

  await thunk(store);

  location = store.getState().location;
  if (doesRedirect(location, res, req)) return false;

  const status = location.type === NOT_FOUND ? 404 : 200;
  res.status(status);
  return store;
}

const doesRedirect = ({ kind, pathname }, res, req) => {
  if (kind === 'redirect') {
    req.session.currentUrl = req.path;
    res.redirect(302, pathname);
    return true;
  }
};
