import { render, waitFor } from '@testing-library/react';

import { withAudit } from '~/tests/utils';

import Pixel, { type PixelProps } from './index';

describe('<Pixel />', () => {
  it('should immediatly send selected event', async () => {
    const sendEventMock = jest.fn();

    render(withAudit(<Pixel type="page-view" />, {
      lib: {
        sendEvent: sendEventMock,
      },
    }));
    await waitFor(() => expect(sendEventMock).toHaveBeenCalled());
  });

  it('should not resend event if cookies_enabled change but ' +
  'reuse is false', async () => {
    const sendEventMock = jest.fn();
    const config = { cookies_enabled: false };
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

  it('should send page-view with data if its asked for', async () => {
    const sendEventMock = jest.fn();
    const data: PixelProps['data'] = { type: 'premium' };

    render(withAudit(
      <Pixel type="page-view" data={data} />, {
        lib: {
          sendEvent: sendEventMock,
        },
      }));
    await waitFor(() => expect(sendEventMock)
      .toHaveBeenCalledWith('page-view', data, undefined));
  });

  it('should send options if its asked for', async () => {
    const sendEventMock = jest.fn();
    const options = { beacon: true };
    render(withAudit(
      <Pixel type="page-view" options={options} />, {
        lib: {
          sendEvent: sendEventMock,
        },
      }));
    await waitFor(() => expect(sendEventMock)
      .toHaveBeenCalledWith('page-view', undefined, options));
  });
});
