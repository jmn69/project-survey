import {isAllowed} from 'client/utils';

describe('client utils', () => {

    it('should allowed to access a route without a role', () => {
        const state = { app: {loggedIn: false}}
        const res = isAllowed('SIGNIN', state);
        expect(res).toEqual(true);
    });

    it('should allowed to access a route with a role', () => {
        const state = { app: {loggedIn: true}}
        const res = isAllowed('DASHBOARD', state);
        expect(res).toEqual(true);
    });

    it('should not allowed to access a route with a role', () => {
        const state = { app: {loggedIn: false}}
        const res = isAllowed('DASHBOARD', state);
        expect(res).toEqual(false);
    });
});