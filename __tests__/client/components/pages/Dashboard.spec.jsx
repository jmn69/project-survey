import React from 'react';
import { shallow } from 'enzyme';

import Dashboard from 'client/components/pages/Dashboard.jsx';

describe('Dashboard', () => {

  describe('UI', () => {

    it('should render', () => {
      const render = () => {
        shallow(<Dashboard />);
      };
      expect(render).not.toThrow();
    });

  });

});

