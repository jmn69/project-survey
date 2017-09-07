import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import FormText from 'reactstrap/lib/FormText';

import { server, port } from 'client/config';
import API from 'client/api';
import SigninConnected, { SignIn, mapStateToProps, mapDispatchToProps } from 'client/components/pages/SignIn.jsx';

jest.spyOn(API, "authentication").mockImplementation(async () => ({ success: true }))

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

    it('should render errors', () => {
      const wrapper = shallow(<SignIn />);
      wrapper.setState({
        errors: { test: "test error" }
      });
      const renderError = wrapper.instance().renderError("test");
      expect(renderError).toEqual(
        <FormText color="danger">test error</FormText>
      );
    });

    it('should render the loading spinner', () => {
      const wrapper = shallow(<SignIn />);
      wrapper.setProps({
        isLoading: true
      });
      const renderLoading = wrapper.instance().renderLoading();
      expect(renderLoading).toEqual(
        <i
          className="fa fa-spinner fa-pulse fa-1x fa-fw"
          style={{ marginLeft: "1rem" }}
          aria-hidden="true"
        >
        </i>
      );
    });

    it('should not render the loading spinner', () => {
      const wrapper = shallow(<SignIn />);
      wrapper.setProps({
        isLoading: false
      });
      const renderLoading = wrapper.instance().renderLoading();
      expect(renderLoading).toEqual(null);
    });

    it('should login on click', () => {
      const wrapper = shallow(<SignIn />);
      const mockAuth = jest.fn(() => Promise.resolve({ success: true }));
      const mockGoTo = jest.fn();
      wrapper.setProps({
        authentication: mockAuth,
        goTo: mockGoTo
      });
      wrapper.instance().onLoginClick();
      expect(mockAuth).toHaveBeenCalled();
    });

    it('should set errors when login failed', () => {
      const wrapper = shallow(<SignIn />);
      const promise = Promise.resolve({ success: false });
      const mockAuth = jest.fn(() => promise);
      const mockGoTo = jest.fn();

      wrapper.setProps({
        authentication: mockAuth,
        goTo: mockGoTo
      });
      
      wrapper.instance().onLoginClick();
      return promise
      .then(() => {
        expect(wrapper).toHaveState('errors', {authentication: "Mmmh, il y a une erreur avec l'email ou le password"});
      });
      
    });

    describe('SignIn container', () => {
      it("mapStateToProps", function () {
        const state = {
          app: {
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

