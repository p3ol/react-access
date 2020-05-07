import 'jsdom-global/register';
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
    await page.goto('http://localhost:63000/');
    jest.setTimeout(30000);
  });

  it('should render', () => {
    const component = shallow(<Paywall id="test" />);
    expect(component.find('#test').length).toBe(1);
  });

  it('should render a full paywall when used with all necessary' +
    'siblings', async () => {

    await page.waitForSelector('iframe#p3-paywall');
    const src = await page.evaluate(() =>
      document.querySelector('iframe#p3-paywall').src
    );


    const onIdentityAvailable = sinon.spy();
    const onReadyAvailable = sinon.spy();

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
              expect(onIdentityAvailable.called).toBe(true);
            },
            onready: () => {
              expect(onReadyAvailable.called).toBe(true);
            },
          }}
        />
      </PaywallContext>
    );
    component.update();

    expect(src).toBe('https://assets.poool.fr/paywall.html');

  });

});
