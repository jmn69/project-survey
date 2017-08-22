import reducer from 'client/reducers/app';

describe('reducer app', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            loggedIn: false,
            currentUrl: "",
            isFetching: false
        });
    })
});