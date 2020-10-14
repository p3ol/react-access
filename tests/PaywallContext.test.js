import React, { createRef } from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { PaywallContext, usePoool } from '../src';

describe('<PaywallContext />', () => {
  let ref;
  beforeAll(() => {
    ref = global.poool;
    global.poool = () => {};
  });

  it('should render children', async () => {

    const component = mount(
      <PaywallContext><div className="test" /></PaywallContext>
    );

    await act(async () => { component.update(); });
    expect(component.find('.test').length).toBe(1);
  });

  it('should not reload the library twice', async () => {
    const ref_ = createRef();
    const TestComponent = () => {
      const { poool } = usePoool();
      ref_.current = poool;
      return null;
    };

    const component = mount(
      <PaywallContext><TestComponent /></PaywallContext>
    );

    await act(async () => { component.update(); });
    expect(ref_.current).toBeTruthy();
    const witness = ref_.current;

    await act(async () => { component.setProps({ appId: 'test' }); });
    expect(ref_.current).toBe(witness);
  });

  afterAll(() => {
    global.poool = ref;
  });

});
