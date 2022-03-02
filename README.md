![CI](https://github.com/p3ol/react-access/workflows/CI/badge.svg)

# Poool Access - React SDK

> The easiest way to add Poool Access to your React app ✨

## Installation

```bash
yarn add @poool/react-access
```

## Usage

With the new Poool `Access` and `Audit` scripts, you can use each part in standalone or combined way.

### Access & Audit

```jsx
import React, { useRef } from 'react';
import { AccessContext, RestrictedContent, Paywall, Pixel } from '@poool/react-access';

export default = () => {
  const contentRef = useRef();

  return (
    <>
      { /* Wrap everything with our AccessContext component, note the withAudit
        props which saves you from writing AuditContext inside of AccessContext */ }
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

        { /* Place our paywall element where you want your paywall to be displayed */ }
        <Paywall
          contentRef={contentRef}
        />
        { /*  Place our Pixel component next to your content to trigger an event to Audit whenever your content is loaded */ }
        <Pixel type="page-view" data={{ type: 'premium' }} />
      </AccessContext>
    </>
  );
};
```

### Access only

```jsx
import React, { useRef } from 'react';
import { AccessContext, RestrictedContent, Paywall } from '@poool/react-access';

export default () => {
  const contentRef = useRef();
  return (
    <>
      { /* Wrap everything with our AccessContext component */ }
      <AccessContext
        appId="insert_your_app_id"
        config={{ cookies_enabled: true }}
      >
        { /* Wrap your content with our RestrictedContent component */ }
        <RestrictedContent ref={contentRef}>
          <div className="articleBody">
            <p>Your article content</p>
          </div>
        </RestrictedContent>

        { /* Place our paywall element where you want your paywall to be displayed */ }
        <Paywall
          contentRef={contentRef}
        />
      </AccessContext>
    </>
  );
};
```

### Audit only

```jsx
import React, { useRef } from 'react';
import { AuditContext, Pixel } from '@poool/react-access';

export default () => (
  <>
    { /* Wrap everything with our AuditContext component */ }
    <AuditContext appId="insert_your_app_id">
      <div className="articleBody">
        <p>Your article content</p>
      </div>
      { /* Place our Pixel component to trigger an event to Audit whenever Pixel is loaded */ }
      <Pixel type="conversion" />
    </AuditContext>
  </>
);
```

### IE Compatibility

As part of a global effort to deprecate Internet Explorer, we decided not to include IE polyfills by default.
You can still manually import a version containing all the necessary polyfills for IE >= 11:

```javascript
import * as PooolReactAccess from '@poool/react-access/dist/ie/esm';
```

Please note that this build will probably add more than 150kb to your final bundle.

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
- `events` {`Object`} (optional, default: `{}`) Paywall events listeners (see the [events](https://poool.dev/docs/javascript/access/events) documentation)

### `<Pixel />`

#### Props

- `type` {`String`} Event type (supported types: `page-view`, `conversion`)
- `data`{`Object`} (optional but mandatory when type is page-view) Data associated to the event (see the [audit](https://poool.dev/docs/javascript/audit/methods#page-view) documentation)
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
- `createFactory` {`Function`} Function to trigger a new access init, returns the created access instance, with passed options
- `destroyFactory` {`Function`} Function to delete a factory

#### Example

```jsx
const {  appId, lib: access } = useAccess();
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

```jsx
const {  appId, lib: audit } = useAudit();
```

## Contributing

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

## Contributors

<!-- Contributors START
Ugo_Stephant dackmin https://ugostephant.io code doc tools
Contributors END -->
<!-- Contributors table START -->
| <img src="https://avatars.githubusercontent.com/dackmin?s=100" width="100" alt="Ugo Stephant" /><br />[<sub>Ugo Stephant</sub>](https://github.com/dackmin)<br />[💻](https://github.com/p3ol/react-access/commits?author=dackmin) [📖](https://github.com/p3ol/react-access/commits?author=dackmin) 🔧 | <img src="https://avatars.githubusercontent.com/defless?s=100" width="100" alt="Simon Deflesschouwer" /><br />[<sub>Simon Deflesschouwer</sub>](https://github.com/defless)<br />[🔧](https://github.com/p3ol/react-access/commits?author=defless) |
| :---: | :---: |
<!-- Contributors table END -->
