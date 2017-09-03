import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';

import API from 'client/api';
import MenuBarConnected, { MenuBar, mapStateToProps, mapDispatchToProps } from 'client/components/MenuBar.jsx';

jest.spyOn(API, "logout").mockImplementation(async () => ({ success: true }))
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

describe('MenuBar', () => {

  describe('UI', () => {

    it('should render', () => {
      const render = () => {
        shallow(<MenuBar />);
      };
      expect(render).not.toThrow();
    });

    it('should render the admin bar', () => {
      const wrapper = shallow(<MenuBar />);
      wrapper.setProps({
        path: "/",
        loggedIn: true,
        goToPage: () => { }
      });
      expect(wrapper.find('#adminBar')).toBePresent();
    });

    it('should note render the admin bar', () => {
      const wrapper = shallow(<MenuBar />);
      wrapper.setProps({
        path: "/",
        loggedIn: false,
        goToPage: () => { }
      });
      expect(wrapper.find('#adminBar')).not.toBePresent();
    });

    it('should render signout', () => {
      const wrapper = shallow(<MenuBar />);
      wrapper.setProps({
        loggedIn: true,
        signOut: () => { },
        goToPage: () => { }
      });
      
      expect(wrapper.find('#signout-link')).toBePresent();
    });

    it('should not render signout', () => {
      const wrapper = shallow(<MenuBar />);
      wrapper.setProps({
        loggedIn: false,
        signOut: () => { },
        goToPage: () => { }
      });
      
      expect(wrapper.find('#signout-link')).not.toBePresent();
    });

    it('should fire goToPage on NavLink click', () => {
      const spy = jest.fn();
      const wrapper = shallow(<MenuBar />);
      wrapper.setProps({
        goToPage: spy
      });
      wrapper.instance().handleNavClick('DASHBOARD');
      expect(spy).toHaveBeenCalledWith('DASHBOARD');
    });

  });

  describe('SignIn container', () => {
    it("mapStateToProps", function () {
      const state = {
        app: {
          loggedIn: true
        },
        location: {
          pathname: "/"
        }
      };

      expect(mapStateToProps(state)).toEqual({
        loggedIn: true,
        path: "/"
      });
    });

    describe("mapDispatchToProps", function () {

      it("goToPage", function () {

        const { store, fn } = prepare("goToPage", {});
        fn('DASHBOARD').then(() => {
          expect(store.getActions().map(a => a.type)).toEqual([
            "DASHBOARD"
          ]);
        });
      });

      it("signOut", function () {
        const { store, fn } = prepare("signOut", {});
        fn().then(() => {
          expect(store.getActions().map(a => a.type)).toEqual([
            "REQUEST_BEGIN",
            "LOGOUT_SUCCESS",
            "SIGNIN",
            "REQUEST_END"
          ]);
        });
      });

    });

  });

});

