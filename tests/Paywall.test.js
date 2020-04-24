import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Paywall from '../src/Paywall';
import PaywallContext from '../src/PaywallContext';
import RestrictedContent from '../src/RestrictedContent';

describe('<PaywallContext />', () => {

  beforeAll(async () => {
    const script = document.createElement('script');
    document.head.appendChild(script);
    jest.setTimeout(10000);
  });

  it('should render', () => {
    const component = shallow(<Paywall id="test" />);
    expect(component.find('#test').length).toBe(1);
  });

  it('should render a full paywall when used with all necessary ' +
    'siblings', (done) => {
    const onIdentityAvailable = sinon.spy();

    const component = mount(
      <PaywallContext
        appId="ZRGA3EYZ4GRBTSHREG345HGGZRTHZEGEH"
        config={{ cookies_enabled: true, debug: true }}
      >
        <RestrictedContent><p>Test</p></RestrictedContent>
        <Paywall
          id="test"
          events={{
            onIdentityAvailable: () => {
              expect(component.find('div#test').length).toBe(1);
              expect(onIdentityAvailable.called).toBe(true);
              done();
            },
          }}
        />
      </PaywallContext>
    );

    component.update();
  });

});
