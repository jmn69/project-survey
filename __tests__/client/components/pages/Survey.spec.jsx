import React from 'react';
import { shallow } from 'enzyme';

import SurveyConnected, { Survey, mapStateToProps, mapDispatchToProps } from 'client/components/pages/Survey.jsx';

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

