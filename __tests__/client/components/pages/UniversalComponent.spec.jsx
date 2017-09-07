import React from 'react';
import { shallow } from 'enzyme';

import UniversalComponent from 'client/components/pages/UniversalComponent.js';

describe('UniversalComponent', () => {

  describe('UI', () => {

    it('should render', () => {
      const render = () => {
        shallow(<UniversalComponent />);
      };
      expect(render).not.toThrow();
    });

  });

});

