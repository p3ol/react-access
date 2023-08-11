[![CI](https://github.com/p3ol/react-access/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/p3ol/react-access/actions/workflows/ci.yml)

# Poool Access - React SDK

> The easiest way to add Poool Access to your React app ✨


ℹ️ You're looking at the documentation for the v2+ of React Access. If you're looking for v1, please see the [v1 docs](https://github.com/p3ol/react-access/tree/legacy/v1).

## Installation

```bash
yarn add @poool/react-access
```

## Usage

```jsx
import { useRef } from 'react';
import {
  AccessContext,
  RestrictedContent,
  Paywall,
  Pixel,
} from '@poool/react-access';

export default = () => {
  const contentRef = useRef();

  return (
    <>
      { /*
        Wrap everything with our AccessContext component. Note the withAudit
        prop which saves you from writing AuditContext inside of
        AccessContext
      */ }
      <AccessContext
        appId="insert_your_app_id"
        config={{ cookies_enabled: true }}
        withAudit={true}
      >
        { /* Wrap your content with our RestrictedContent component */ }
        <RestrictedContent ref={contentRef}>
          <div className="articleBody">
            <p>Your article content</p>
          </div>
        </RestrictedContent>

        { /*
          Place our <Paywall /> component where you want your paywall to be
          displayed
        */ }
        <Paywall contentRef={contentRef} />

        { /*
          Place our <Pixel /> component anywhere inside an <AuditContext />
          component (or <AccessContext withAudit={true} />) to track page-view
          events (used for native segmentation)
        */ }
        <Pixel type="page-view" data={{ type: 'premium' }} />
      </AccessContext>
    </>
  );
};
```

### Usage with AuditContext

```jsx
import { useRef } from 'react';
import {
  AccessContext,
  AuditContext,
  Paywall,
  RestrictedContent,
  Pixel,
} from '@poool/react-access';

export default () => {
  const contentRef = useRef();

  return (
    <AuditContext appId="insert_your_app_id">
      <AccessContext appId="insert_your_app_id">
        <RestrictedContent ref={contentRef}>
          <div className="articleBody">
            <p>Your article content</p>
          </div>
        </RestrictedContent>

        <Paywall contentRef={contentRef} />
        <Pixel type="conversion" />
      </AccessContext>
    </AuditContext>
  );
};
```

## Documentation

### `<AccessContext />`

#### Props

- `appId` {`String`} Your Poool App ID
- `config` {`Object`} (optional) Default paywall config (see the [configuration](https://poool.dev/docs/javascript/access/configuration) documentation).
- `styles` {`Object`} (optional) Default paywall styles (see the [styles](https://poool.dev//docs/javascript/access/appearances) documentation).
- `texts` {`Object`} (optional) Default paywall texts (see the [texts](https://poool.dev/docs/javascript/access/texts) documentation).
- `events` {`Object`} (optional) Paywall events listeners (see the [events](https://poool.dev/docs/javascript/access/events) documentation).
- `variables` {`Object`} (optional) Paywall variables (see the [variables](https://poool.dev/docs/javascript/access/variables) documentation).
- `scriptUrl` {`String`} (optional, default: `'https://assets.poool.fr/access.min.js'`) Default Poool Access SDK url
- `withAudit` {`Boolean`} (optional, default: `false`) Whether to include AuditContext in AccessContext or not

### `<AuditContext />`

#### Props

- `appId` {`String`} Your Poool App ID
- `config` {`Object`} (optional) Default audit config (see the [configuration](https://poool.dev/docs/javascript/audit/configuration) documentation).
- `events` {`Object`} (optional) Audit events listeners (see the [events](https://poool.dev/docs/javascript/audit/events) documentation).
- `scriptUrl` {`String`} (optional, default: `'https://assets.poool.fr/audit.min.js'`) Default Poool Audit SDK url

### `<RestrictedContent />`

#### Props

- `mode` {`String` : `'excerpt'` | `'hide'`| `'custom'`} (optional) Way to hide content see [Access configuration](https://poool.dev/docs/javascript/access/configuration#mode) for more informations.
- `percent` {`Number`} (optional) Percentage of content to hide.

### `<Paywall />`

#### Props

- `contentRef` {`React.Ref`} Reference to the RestrictedContent component associated to this Paywall 
- `id` {`String`} (optional, default: random id) Custom wrapper component ID
- `pageType` {`String`} (optional, default: `'premium'`) Current page type (supported types: `page`, `premium`, `free`, `subscription`)
- `config` {`Object`} (optional) Paywall config (see the [configuration](https://poool.dev/docs/javascript/access/configuration) documentation).
- `styles` {`Object`} (optional) Paywall styles (see the [styles](https://poool.dev//docs/javascript/access/appearances) documentation).
- `texts` {`Object`} (optional) Paywall texts (see the [texts](https://poool.dev/docs/javascript/access/texts) documentation).
- `variables` {`Object`} (optional) Paywall variables (see the [variables](https://poool.dev/docs/javascript/access/variables) documentation).
- `events` {`Object`} (optional) Paywall events listeners (see the [events](https://poool.dev/docs/javascript/access/events) documentation)

### `<Pixel />`

#### Props

- `type` {`String`} Event type (supported types: `page-view`)
- `data`{`Object`} (optional but mandatory when type is page-view) Data associated to the event (see the [audit](https://poool.dev/docs/javascript/audit/methods#page-view) documentation)
- `config` {`Object`} (optional) Pixel config (see the [configuration](https://poool.dev/docs/javascript/audit/configuration) documentation).
- `options` {`Object`} (optional) Options to pass to the event (see the [audit](https://poool.dev/docs/javascript/audit/methods#options) documentation)
- `onDone` {`Function`} (optional) Callback to execute when the event is done
- `reuse` {`Boolean`} (optional, default: `false`) Whether to reuse the same event or not

### useAccess()

Can be used to retrieve some properties from the current access context, as well as the Access SDK itself.

#### Returns

- `lib` {`Function`} The entire Access sdk
- `appId` {`String`} Current app ID
- `config` {`Object`} Current access context config
- `texts` {`Object`} Current context texts
- `styles` {`Object`} Current context styles
- `variables` {`Object`} Current context variables
- `events` {`Object`} Current access context events listeners
- `scriptURL` {`Object`} Access SDK url

#### Example

```js
const { appId, lib: access } = useAccess();
```

### useAudit()

Can be used to retrieve some properties from the current audit context, as well as the Audit SDK itself.

#### Returns 

- `lib` {`Function`} The entire Audit sdk
- `appId` {`String`} Current app ID
- `config` {`Object`} Current audit context config
- `events` {`Object`} Current audit context events listeners
- `scriptURL` {`Function`} Audit SDK url

#### Example

```js
const { appId, lib: audit } = useAudit();
```

## Contributing

[![](https://contrib.rocks/image?repo=p3ol/react-access)](https://github.com/p3ol/react-access/graphs/contributors)

Please check the [CONTRIBUTING.md](https://github.com/p3ol/react-access/blob/master/CONTRIBUTING.md) doc for contribution guidelines.


## Development

Install dependencies:

```bash
yarn install
```

Run examples at http://localhost:63000/ with webpack dev server:

```bash
yarn serve
```

And test your code:

```bash
yarn test
```

## License

This software is licensed under [MIT](https://github.com/p3ol/react-access/blob/master/LICENSE).

## v2 -> v3 Migration

**There shouldn't be any migration needed for this version.**

v3 only drops support for Node 14 & yarn, so unless you want to contribute to this repo using Node 14 or Yarn, you don't have to do anything.

It also drops support for Internet Explorer, but as Access.js already dropped support for IE in 2019, this release only removes some useless IE polyfills.


## v1 -> v2 Migration

- `<PaywallContext />` has been replaced with `<AccessContext />` (used to show the paywall) and `<AuditContext />` (used to track particular events)
- `usePoool` has been replaced with `useAccess` and `useAudit`, both respectively requiring the above contexts to be a parent component
- `<Paywall />` now needs a `contentRef` prop to be able to lock/unlock the content, and the ref should be retrieved from `<RestrictedContent />`
- `<Pixel />` has been added to avoid manual event tracking using the legacy `poool()` function

Basic example in v1:
```jsx
import {
  PaywallContext,
  RestrictedContent,
  Paywall,
  usePoool,
} from '@poool/react-access';

export default () => {
  const { poool } = usePoool();

  useEffect(() => {
    poool('config', 'context', 'sports');
    poool('send', 'page-view', 'premium');
  }, []);

  return (
    <PaywallContext appId="test" config={{ cookies_enabled: true }}>
      <RestrictedContent><div>test</div></RestrictedContent>
      <Paywall />
    </PaywallContext>
  );
};
```

To be transformed in v2:
```jsx
import { useRef } from 'react';
import {
  AccessContext,
  RestrictedContent,
  Paywall,
  Pixel,
} from '@poool/react-access';

export default () => {
  const contentRef = useRef();

  return (
    <AccessContext
      appId="test"
      config={{ cookies_enabled: true }}
      withAudit={true}
    >
      <RestrictedContent ref={contentRef}><div>test</div></RestrictedContent>

      <Paywall config={{ context: 'sports' }} contentRef={contentRef} />
      <Pixel type="page-view" data={{ type: 'premium' }} />
    </AccessContext>
  );
};
```
