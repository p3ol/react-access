![CI](https://github.com/p3ol/react-access/workflows/CI/badge.svg)

# Poool Access - React SDK

> The easiest way to add Poool Access to your React app ✨

## Installation

```
yarn add @poool/react-access
```

## Usage

```jsx
import React from 'react';
import { PaywallContext, RestrictedContent, Paywall } from '@poool/react-access';

export default () => (
  { /* Wrap everything with our PaywallContext component */ }
  <PaywallContext appId="insert_your_app_id" config={{ cookies_enabled: true }}>

    { /* Wrap your content with our RestrictedContent component */ }
    <RestrictedContent>
      <div className="articleBody">
        <p>Your article content</p>
      </div>
    </RestrictedContent>

    { /* Place our paywall element where you want your paywall to be displayed */ }
    <Paywall
      pageType="premium"
      beforeInit={poool => {
        poool('config', 'debug', true);
      }}
    />
  </PaywallContext>
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

### `<PaywallContext />`

#### Props

- `appId` {`String`} Your Poool App ID
- `config` {`Object`} (optional) Default paywall config (https://dev.poool.fr/access/configuration).
- `styles` {`Object`} (optional) Default paywall styles (https://dev.poool.fr/access/styles).
- `texts` {`Object`} (optional) Default paywall texts (https://dev.poool.fr/access/texts).
- `scriptUrl` {`String`} (optional, default: `'https://assets.poool.fr/poool.min.js'`) Default Poool Access SDK url

### `<RestrictedContent />`

#### Props

No custom props

### `<Paywall />`

#### Props

- `id` {`String`} (optional, default: random id) Custom wrapper component ID
- `pageType` {`String`} (optional, default: `'premium'`) Current page type (https://dev.poool.fr/access/actions#page-view)
- `events` {`Object`} (optional, default: `{}`) Paywall events listeners (https://dev.poool.fr/access/events)
- `beforeInit` {`Function`} (optional, default: `() => {}`) Use this to do whatever you want to apply to config, styles, ... before paywall render
  - `poool` {`Function`} Reference to global `poool` passed as parameter
- `beforeUnmount` {`Function`} (optional, default: `() => {}`) Use this to do whatever you want to do before paywall unmount
  - `poool` {`Function`} Reference to global `poool` passed as parameter

### `usePoool()`

Can be used to retrieved some properties from the current paywall context, as well as the Poool SDK itself.

#### Returns

- `poool` {`Function`} The entire poool library
- `appId` {`String`} Current app ID
- `config` {`Object`} Context config
- `texts` {`Object`} Context texts
- `styles` {`Object`} Context styles

#### Example

```jsx
const { poool, appId } = usePoool();
poool && poool('init', appId);
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
