import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetch from 'fetch-everywhere';

import API from '../../../client/api';
import SigninConnected, { SignIn, mapStateToProps, mapDispatchToProps } from '../../../client/components/Signin';
const mockAPI = {
  authentication: jest.spyOn(API, "authentication").mockImplementation(async () => ({ success: true }))
};

const mockStore = configureStore([thunk]);

const prepare = (name, state) => {
  const store = mockStore(state);
  return {
    store,
    fn: (...args) => Promise.resolve(
      mapDispatchToProps(store.dispatch)[name](...args)
    )
  };
};

describe('SignIn', () => {

  describe('UI', () => {

    it('should render', () => {
      const render = () => {
        shallow(<SignIn />);
      };
      expect(render).not.toThrow();
    });

    it('should triggered email changed', () => {
      const spy = jest.spyOn(SignIn.prototype, "onEmailChange");
      const wrapper = shallow(<SignIn />);
      wrapper.find('#signin-email').simulate("change", {
        target: {
          value: "test"
        }
      });
      expect(spy).toHaveBeenCalledWith({
        target: {
          value: "test"
        }
      })
    });

    it('should triggered password changed', () => {
      const spy = jest.spyOn(SignIn.prototype, "onPasswordChange");
      const wrapper = shallow(<SignIn />);
      wrapper.find('#signin-password').simulate("change", {
        target: {
          value: "test"
        }
      });
      expect(spy).toHaveBeenCalledWith({
        target: {
          value: "test"
        }
      })
    });

    it('should login on click', () => {
      const wrapper = shallow(<SignIn />);
      const mockAuth = jest.fn(async (payload) => {});
      const mockGoTo = jest.fn();
      wrapper.setProps({ 
        authentication: mockAuth,
        goTo: mockGoTo
       });
      wrapper.instance().onLoginClick();
      expect(mockAuth).toHaveBeenCalled();
    });

    describe('SignIn container', () => {
      it("mapStateToProps", function () {
        const state = {
          auth: {
            currentUrl: "/"
          }
        };

        expect(mapStateToProps(state)).toEqual({
          currentUrl: "/"
        });
      });

      describe("mapDispatchToProps", function () {

        it("authentication", function () {
          const { store, fn } = prepare("authentication", {});
          fn().then(() => {
            expect(store.getActions().map(a => a.type)).toEqual([
              "REQUEST_BEGIN",
              "LOGIN_SUCCESS",
              "REQUEST_END"
            ]);
          });
        });

        it("goTo", function () {
          const { store, fn } = prepare("goTo", {});
          fn().then(() => {
            expect(store.getActions().map(a => a.type)).toEqual(["SIGNIN"]);
          });
        });

      });

    });

  });

});

