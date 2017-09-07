import React from 'react';
import { shallow } from 'enzyme';

import SurveyList from 'client/components/pages/SurveyList.jsx';

describe('SurveyList', () => {

  describe('UI', () => {

    it('should render', () => {
      const render = () => {
        shallow(<SurveyList />);
      };
      expect(render).not.toThrow();
    });

  });

});

