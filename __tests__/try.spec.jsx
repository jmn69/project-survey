import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Home from '../app/pages/Home';

describe('Welcome', () => {
  it('home renders hello world', () => {
    const home = shallow(<Home />);
    expect(home.find('div').text()).toEqual('hello world');
  });
});