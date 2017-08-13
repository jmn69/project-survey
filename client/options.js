import { redirect } from 'redux-first-router';
import { isAllowed, isServer } from './utils';
import { authenticate } from './actions';

export default {
  onBeforeChange: (dispatch, getState, action) => {
    const allowed = isAllowed(action.type, getState());
    
    if (!allowed) {
      const action = redirect({ type: 'SIGNIN' });
      dispatch(action);
    }
  },
  onAfterChange: (dispatch, getState) => {
  }
}
