import React from 'react';
import { shallow } from 'enzyme';

import AdminArea from 'client/components/AdminArea.jsx';

describe('AdminArea', () => {

  describe('UI', () => {

    it('should render', () => {
      const render = () => {
        shallow(<AdminArea />);
      };
      expect(render).not.toThrow();
    });

  });

});

