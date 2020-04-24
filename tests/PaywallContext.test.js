import React from 'react';
import { shallow } from 'enzyme';

import PaywallContext from '../src/PaywallContext';

describe('<PaywallContext />', () => {

  it('should render children', () => {
    const component = shallow(
      <PaywallContext><div className="test" /></PaywallContext>);
    expect(component.find('.test').length).toBe(1);
  });

});
