import { render, waitFor } from '@testing-library/react';

import { Pixel } from '../src';
import { withAudit } from './utils';

describe('<Pixel />', () => {
  it('should immediatly send selected event', () => {
    const sendEventMock = jest.fn();

    render(withAudit(<Pixel type="page-view" />, {
      lib: {
        sendEvent: sendEventMock,
      },
    }));
    expect(sendEventMock).toHaveBeenCalled();
  });

  it('should not resend event if cookies_enabled change but ' +
  'reuse is false', async () => {
    const sendEventMock = jest.fn();
    const config = {
      cookies_enabled: false,
    };
    render(withAudit(<Pixel type="page-view" />, {
      lib: { sendEvent: sendEventMock },
      config,
    }));
    expect(sendEventMock).toHaveBeenCalledTimes(1);

    config.cookies_enabled = true;

    await waitFor(() => expect(sendEventMock).toHaveBeenCalledTimes(1));
  });

  it('should resend event if cookies_enabled change and ' +
  'reuse is truthy', async () => {
    const sendEventMock = jest.fn();
    const config = {
      cookies_enabled: false,
    };
    render(withAudit(<Pixel type="page-view" reuse={true} />, {
      lib: { sendEvent: sendEventMock },
      config,
    }));
    expect(sendEventMock).toHaveBeenCalledTimes(1);

    config.cookies_enabled = true;
    await waitFor(() => expect(sendEventMock).toHaveBeenCalledTimes(2));
  });

  it('should send conversation if its asked for', () => {
    const sendEventMock = jest.fn();

    render(withAudit(<Pixel type="conversion" />, {
      lib: {
        sendEvent: sendEventMock,
      },
    }));
    expect(sendEventMock)
      .toHaveBeenCalledWith('conversion', undefined, undefined);
  });

  it('should send page-view with data if its asked for', () => {
    const sendEventMock = jest.fn();
    const data = { type: 'premium' };

    render(withAudit(
      <Pixel type="page-view" data={data} />, {
        lib: {
          sendEvent: sendEventMock,
        },
      }));
    expect(sendEventMock)
      .toHaveBeenCalledWith('page-view', data, undefined);
  });

  it('should send options if its asked for', () => {
    const sendEventMock = jest.fn();
    const options = { beacon: true };
    render(withAudit(
      <Pixel type="page-view" options={options} />, {
        lib: {
          sendEvent: sendEventMock,
        },
      }));
    expect(sendEventMock)
      .toHaveBeenCalledWith('page-view', undefined, options);
  });
});
