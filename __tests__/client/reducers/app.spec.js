import reducer from 'client/reducers/app';
import * as actionsApp from 'client/actions/app';

const assertReducer = ({ from, to, action }) => {
    expect(reducer(from, action)).toEqual(to);
};

describe('reducer app', () => {

    it('should return the initial state', () => {
        assertReducer({
            from: undefined,
            to: {
                loggedIn: false,
                currentUrl: "",
                isFetching: false
            },
            action: {}
        });
    })

    it('should handle SET_REDIRECT_URL', () => {
        const url = "/";
        assertReducer({
            from: {},
            to: { currentUrl: url },
            action: actionsApp.setRedirectUrl(url)
        });
    });

    it('should handle LOGIN_SUCCESS', () => {
        assertReducer({
            from: {},
            to: { loggedIn: true },
            action: actionsApp.loginSuccess()
        });
    });

    it('should handle LOGIN_FAILED', () => {
        assertReducer({
            from: {},
            to: { loggedIn: false },
            action: actionsApp.loginFailed()
        });
    });

    it('should handle LOGOUT_SUCCESS', () => {
        assertReducer({
            from: {},
            to: { loggedIn: false, currentUrl: null },
            action: actionsApp.logoutSuccess()
        });
    });

    it('should handle LOGOUT_FAILED', () => {
        assertReducer({
            from: {},
            to: { loggedIn: true },
            action: actionsApp.logoutFailed()
        });
    });

    it('should handle REQUEST_BEGIN', () => {
        assertReducer({
            from: {},
            to: { isFetching: true },
            action: actionsApp.requestBegin()
        });
    });

    it('should handle REQUEST_END', () => {
        assertReducer({
            from: {},
            to: { isFetching: false },
            action: actionsApp.requestEnd()
        });
    });
});