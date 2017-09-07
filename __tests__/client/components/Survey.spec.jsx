import React from 'react';
import { shallow } from 'enzyme';

import Survey from 'client/components/Survey.jsx';

describe('Survey', () => {

  describe('UI', () => {

    it('should render', () => {
      const render = () => {
        shallow(<Survey />);
      };
      expect(render).not.toThrow();
    });

  });

});

