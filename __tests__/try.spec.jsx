import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Home from '../client/pages/Home';

describe('Welcome', () => {
  it('home renders hello world', () => {
    const home = shallow(<Home />);
    expect(home.find('div').text()).toEqual('<Link />hello world');
  });
});