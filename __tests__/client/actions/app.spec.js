import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import API from 'client/api';
import * as app from 'client/actions/app';

const mockStore = configureStore([thunk]);

describe('Actions app', () => {

    it('setRedirectUrl', () => {
        const url = "/";
        expect(app.setRedirectUrl(url)).toEqual(
            {
                type: app.SET_REDIRECT_URL,
                url
            }
        );
    });

    it('goTo', () => {
        const url = "/";
        expect(app.goTo(url)).toEqual(
            {
                type: 'DASHBOARD'
            }
        );
    });

    it('loginSuccess', () => {
        expect(app.loginSuccess()).toEqual(
            {
                type: app.LOGIN_SUCCESS
            }
        );
    });

    it('loginFailed', () => {
        expect(app.loginFailed()).toEqual(
            {
                type: app.LOGIN_FAILED
            }
        );
    });

    it('logoutSuccess', () => {
        expect(app.logoutSuccess()).toEqual(
            {
                type: app.LOGOUT_SUCCESS
            }
        );
    });

    it('logoutFailed', () => {
        expect(app.logoutFailed()).toEqual(
            {
                type: app.LOGOUT_FAILED
            }
        );
    });

    it('requestBegin', () => {
        expect(app.requestBegin()).toEqual(
            {
                type: app.REQUEST_BEGIN
            }
        );
    });

    it('requestEnd', () => {
        expect(app.requestEnd()).toEqual(
            {
                type: app.REQUEST_END
            }
        );
    });

    describe('authentication', () => {

        it('should be dispatched on successful request', () => {
            jest.spyOn(API, "authentication").mockImplementation(async () => ({ success: true }))
            const store = mockStore({});
            const expectedActions = [
                "REQUEST_BEGIN",
                "LOGIN_SUCCESS",
                "REQUEST_END"
            ]

            return store.dispatch(app.authentication())
                .then(() => {
                    const actualActions = store.getActions().map(action => action.type);
                    expect(actualActions).toEqual(expectedActions)
                });
        });

        it('should be dispatched on failed request', () => {
            jest.spyOn(API, "authentication").mockImplementation(async () => ({ success: false }))
            const store = mockStore({});
            const expectedActions = [
                "REQUEST_BEGIN",
                "LOGIN_FAILED",
                "REQUEST_END"
            ]

            return store.dispatch(app.authentication())
                .then(() => {
                    const actualActions = store.getActions().map(action => action.type);
                    expect(actualActions).toEqual(expectedActions)
                });
        });

    });

    describe('authenticate', () => {

        it('should be dispatched on successful request', () => {
            jest.spyOn(API, "authenticate").mockImplementation(async () => ({ authenticated: true }))
            const store = mockStore({});
            const expectedActions = [
                "REQUEST_BEGIN",
                "LOGIN_SUCCESS",
                "REQUEST_END"
            ]

            return store.dispatch(app.authenticate())
                .then(() => {
                    const actualActions = store.getActions().map(action => action.type);
                    expect(actualActions).toEqual(expectedActions)
                });
        });

        it('should be dispatched on failed request', () => {
            jest.spyOn(API, "authenticate").mockImplementation(async () => ({ authenticated: false }))
            const store = mockStore({});
            const expectedActions = [
                "REQUEST_BEGIN",
                "LOGIN_FAILED",
                "REQUEST_END"
            ]

            return store.dispatch(app.authenticate())
                .then(() => {
                    const actualActions = store.getActions().map(action => action.type);
                    expect(actualActions).toEqual(expectedActions)
                });
        });

    });

    describe('logout', () => {

        it('should be dispatched on successful request', () => {
            jest.spyOn(API, "logout").mockImplementation(async () => ({ success: true }))
            const store = mockStore({});
            const expectedActions = [
                "REQUEST_BEGIN",
                "LOGOUT_SUCCESS",
                "SIGNIN",
                "REQUEST_END"
            ]

            return store.dispatch(app.signOut())
                .then(() => {
                    const actualActions = store.getActions().map(action => action.type);
                    expect(actualActions).toEqual(expectedActions)
                });
        });

        it('should be dispatched on failed request', () => {
            jest.spyOn(API, "logout").mockImplementation(async () => ({ success: false }))
            const store = mockStore({});
            const expectedActions = [
                "REQUEST_BEGIN",
                "LOGOUT_FAILED",
                "REQUEST_END"
            ]

            return store.dispatch(app.signOut())
                .then(() => {
                    const actualActions = store.getActions().map(action => action.type);
                    expect(actualActions).toEqual(expectedActions)
                });
        });

    });

});

