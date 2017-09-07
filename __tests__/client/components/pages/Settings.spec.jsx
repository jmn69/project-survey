import React from 'react';
import { shallow } from 'enzyme';

import Settings from 'client/components/pages/Settings.jsx';

describe('Settings', () => {

  describe('UI', () => {

    it('should render', () => {
      const render = () => {
        shallow(<Settings />);
      };
      expect(render).not.toThrow();
    });

  });

});

