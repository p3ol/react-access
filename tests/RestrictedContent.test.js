import React, { useContext, forwardRef } from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { DefaultContext } from '../src/contexts';
import { RestrictedContent } from '../src';
import PaywallContext from '../src/PaywallContext';

describe('<RestrictedContent />', () => {

  it('should render children', () => {
    const component = shallow(
      <RestrictedContent><div className="test" /></RestrictedContent>);
    expect(component.find('.test').length).toBe(1);
  });

  it('should set content element ref inside context on mount', async () => {
    const Child = forwardRef((props, ref) => {
      const { container } = useContext(DefaultContext);
      return <div ref={ref} id="context-container-test">{ container }</div>;
    });

    const component = mount(
      <PaywallContext>
        <RestrictedContent><Child /></RestrictedContent>
      </PaywallContext>
    );

    await act(async () => { component.update(); });

    expect(component.find('#context-container-test').text())
      .toBe('context-container-test');

    component.unmount();
  });

});
