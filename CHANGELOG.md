# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.0.1](https://github.com/p3ol/react-access/compare/v2.0.0...v2.0.1) (2022-04-27)


### Bug Fixes

* allow to pass config to pixel ([ca03d27](https://github.com/p3ol/react-access/commit/ca03d272f010c8c28407ef820e388fd3e6cd1fe2))
* allow to pass config, texts, styles & variables to paywall component ([6edcdda](https://github.com/p3ol/react-access/commit/6edcdda5333330f1ac9bce5a2d6830af5b0510d9))
* bring back helpers from paywall component ([d31950d](https://github.com/p3ol/react-access/commit/d31950dfaf80e648d90248a00e1ff7ff1cd45eab))

## [2.0.0](https://github.com/p3ol/react-access/compare/v1.2.0...v2.0.0) (2022-04-26)


### ⚠ BREAKING CHANGES

* add AuditContext & Pixel components
* Now uses Access + Audit instead of the (now obsolete) poool method. Please refer to our migration docs (https://poool.dev/fr/docs/react#v2-migration) in order to use this new version.

### Features

* add AuditContext & Pixel components ([8fdfee7](https://github.com/p3ol/react-access/commit/8fdfee7f972c0ef4d3afb0e0a86bcef9da9ff93b))
* add unit tests for Paywall and Pixel components ([edc4891](https://github.com/p3ol/react-access/commit/edc4891df3cb0e3f0d20efe787eb634bb4f92fcc))
* replace poool with new access script integration ([f23a7a8](https://github.com/p3ol/react-access/commit/f23a7a82983926522151ceb03ec56ecbe2d133fd))
* uncomment multiple paywall test and remove Pixel test warnings ([00e977c](https://github.com/p3ol/react-access/commit/00e977c44d67256da66d9128689928ca6e269c5c))
* update readme ([6b718f1](https://github.com/p3ol/react-access/commit/6b718f1990542ea37450bf72fda811d90dc22772))
* **audit:** remove useless props in AuditContext ([0039794](https://github.com/p3ol/react-access/commit/00397944310c48cb072517e006578c41c81714aa))


### Bug Fixes

* **deps:** update dependency @babel/runtime-corejs3 to v7.15.3 ([3f8755a](https://github.com/p3ol/react-access/commit/3f8755a715a91f0e699e087ae17a27fbde8ae8f2))
* **deps:** update dependency @poool/junipero-utils to v2.0.0-rc.21 ([d90572f](https://github.com/p3ol/react-access/commit/d90572fbe18b7175ea69fa7eccfbf26ad16a11eb))
* **deps:** update dependency core-js to v3.14.0 ([ec47bc3](https://github.com/p3ol/react-access/commit/ec47bc34a20e03aa50e0a532f29c3084f9aa2e18))
* **deps:** update dependency core-js to v3.15.0 ([f3ac27f](https://github.com/p3ol/react-access/commit/f3ac27f6b3a9fca4debdcee82ee9d8e1e3e311de))
* **deps:** update dependency core-js to v3.15.1 ([97c0f8e](https://github.com/p3ol/react-access/commit/97c0f8e9a8308b06e224a40dd564dac1ca569aaf))
* **deps:** update dependency core-js to v3.15.2 ([5f6009e](https://github.com/p3ol/react-access/commit/5f6009e8da776d1422c39fbbc65b23232cecc8ce))
* **deps:** update dependency core-js to v3.16.0 ([22ef4b3](https://github.com/p3ol/react-access/commit/22ef4b3844a016096fd6da5607fbd4b9fa76bf99))
* **deps:** update dependency core-js to v3.16.1 ([e0c64a5](https://github.com/p3ol/react-access/commit/e0c64a5a9dae72a7e6363249dd16d50aa4be934f))
* **deps:** update dependency core-js to v3.16.2 ([f94c387](https://github.com/p3ol/react-access/commit/f94c387cd1ff1f96a5fce3f3c9a0f5a1e3f1213f))
* **deps:** update dependency core-js to v3.16.3 ([8e1148f](https://github.com/p3ol/react-access/commit/8e1148f342d141a6c9728ee714fe9501baddd699))
* **deps:** update dependency core-js to v3.16.4 ([9a21f8e](https://github.com/p3ol/react-access/commit/9a21f8e7c3fa5f57bc11a5ae9874ebf961055bd5))
* **deps:** update dependency core-js to v3.17.2 ([bb6d818](https://github.com/p3ol/react-access/commit/bb6d818d8433e3099c867b969082ea3d50b5dfbe))
* **deps:** update dependency core-js to v3.17.3 ([648b783](https://github.com/p3ol/react-access/commit/648b783a44dd1f170bbbc4f7489a28f309311fcd))
* **deps:** update dependency core-js to v3.19.1 ([d1c1100](https://github.com/p3ol/react-access/commit/d1c110062d68cb4aaa460c1f7cf3a5053f54a90c))
* **deps:** update dependency core-js to v3.19.2 ([a643f62](https://github.com/p3ol/react-access/commit/a643f62a3904d0493c85a7bbba4820fe579341c8))
* **deps:** update dependency core-js to v3.19.3 ([66caf6c](https://github.com/p3ol/react-access/commit/66caf6cf6bcca7c4d3560a29b9ad5e274084d8f8))
* **deps:** update dependency core-js to v3.20.2 ([fb44db5](https://github.com/p3ol/react-access/commit/fb44db52d1d519d17a553f084f499031ef547e81))
* **deps:** update dependency core-js to v3.20.3 ([324418a](https://github.com/p3ol/react-access/commit/324418a1152dd3768d07b9aa35c0fdb4ca766570))
* **deps:** update dependency core-js to v3.21.0 ([9e1d40e](https://github.com/p3ol/react-access/commit/9e1d40e51d2efadff9201d51282961b4939b8955))
* **deps:** update dependency core-js to v3.21.1 ([b7c09e2](https://github.com/p3ol/react-access/commit/b7c09e28e9a18299753e340796eed3a2acb8989a))
* **deps:** update dependency core-js to v3.22.1 ([ded485f](https://github.com/p3ol/react-access/commit/ded485f3384e57589f775d534b73a77d9d0fc2e2))
* **deps:** update dependency core-js to v3.22.2 ([6606eb6](https://github.com/p3ol/react-access/commit/6606eb63ed328302723aaa8a1b11d3e63bb62353))
* **deps:** update dependency prop-types to v15.8.1 ([84d12ab](https://github.com/p3ol/react-access/commit/84d12abc4d559820c6266219b5cf8204c7c15c36))
* fix mutliple audit script loading ([841b6d5](https://github.com/p3ol/react-access/commit/841b6d53aca92293b2c1634239c617ed7b1a5f31))
* remove containerRef.current as useEffect cycle param to prevent paywall from being displayed multiple times ([3f0505a](https://github.com/p3ol/react-access/commit/3f0505a3868e4443834aa236c3fd69f0357775c9))
* repair unit tests ([b50ce5a](https://github.com/p3ol/react-access/commit/b50ce5a96a42f611b21305d8f399df43cb060be7))

## [1.2.0](https://github.com/p3ol/react-access/compare/v1.1.4...v1.2.0) (2021-06-01)


### Features

* add prop to explicitly rely on current restricted content ref ([f7b2817](https://github.com/p3ol/react-access/commit/f7b2817867941600db10c9c83bd9734c9ed1894d))
* delay paywall mount to correctly handle restricted content ([46c4f44](https://github.com/p3ol/react-access/commit/46c4f4441f852503858066ae13d89e509910b5bd))

### [1.1.4](https://github.com/p3ol/react-access/compare/v1.1.3...v1.1.4) (2021-05-31)


### Bug Fixes

* use wrapper id instead of a new one when hydrating an ssr app ([9bf89e0](https://github.com/p3ol/react-access/commit/9bf89e013f1958ea5ca62c9aca632a072ddfe66e))

### [1.1.3](https://github.com/p3ol/react-access/compare/v1.1.2...v1.1.3) (2021-05-31)


### Bug Fixes

* **deps:** update dependency core-js to v3.13.1 ([b28669d](https://github.com/p3ol/react-access/commit/b28669d9cafedb60af7b489390e2db701a8c4ac3))
* fix another reference to document ([ba57b45](https://github.com/p3ol/react-access/commit/ba57b4544cd22dd140dcb1bde03ce734396b8ab3))
* **deps:** update dependency core-js to v3.10.0 ([616e444](https://github.com/p3ol/react-access/commit/616e4446e38ef2e9e618df9a55e4fdbc714a6225))
* **deps:** update dependency core-js to v3.10.1 ([92681ce](https://github.com/p3ol/react-access/commit/92681ceeaef78af382428a95678d41ae5021b7d7))

### [1.1.2](https://github.com/p3ol/react-access/compare/v1.1.1...v1.1.2) (2021-03-30)


### Bug Fixes

* allow custom global for usePoool hook ([295a6d8](https://github.com/p3ol/react-access/commit/295a6d861d43464cb9636f1eb645aaa905495c33))
* allow lib to be called when only hook is used ([f9e1d97](https://github.com/p3ol/react-access/commit/f9e1d97a106d09aefc5d76ef1d77da29c6253bf6))

### [1.1.1](https://github.com/p3ol/react-access/compare/v1.1.0...v1.1.1) (2021-03-23)


### Bug Fixes

* enable force_container_recovery to avoid rerender issues ([e5430c9](https://github.com/p3ol/react-access/commit/e5430c9341356d468b0fffb1502ed222422e82a4))
* **deps:** update dependency core-js to v3.9.0 ([104f9ba](https://github.com/p3ol/react-access/commit/104f9ba87946f66253e4098dd7f9adf8c6d91703))
* **deps:** update dependency core-js to v3.9.1 ([542b470](https://github.com/p3ol/react-access/commit/542b47034f728d018e2230965d8663f5e494098d))

## [1.1.0](https://github.com/p3ol/react-access/compare/v1.0.1...v1.1.0) (2021-02-22)


### Features

* add new beforeUnmount pre-unmount-callback ([1823c5c](https://github.com/p3ol/react-access/commit/1823c5c063fc0a06506a3d2cc7cc8f0d3c8ad939))
* auto re-render on cookies_enabled change ([caa9e07](https://github.com/p3ol/react-access/commit/caa9e07d4bedd31e5d69624d5a10bb8b978ecd5d))


### Bug Fixes

* avoid rerendering to infinite and beyond ([19a1b60](https://github.com/p3ol/react-access/commit/19a1b6049975158fb20d9f99e0971afe25626ef2))
* fix internal onready event listener ([e3452f5](https://github.com/p3ol/react-access/commit/e3452f5e99af38857e54b1e6a7c65e1a5c796a3f))
* fix linter issues ([ad4423a](https://github.com/p3ol/react-access/commit/ad4423ad4fab5b4aee58c26daad9bf36b9f5c3aa))
* handle non existing config, styles, texts, events ([e93b355](https://github.com/p3ol/react-access/commit/e93b355dccb303b9a66193c86fbae384a9bdd206))
* pass default values to usePoool hook ([3ddeb1d](https://github.com/p3ol/react-access/commit/3ddeb1d546bf6fbe42c2c8a18879ff995c4f3a96))
* set missing default values ([48f2202](https://github.com/p3ol/react-access/commit/48f220286971d9ec5e5872dce197898264a080d0))
* **deps:** update dependency core-js to v3.8.0 ([ba338e5](https://github.com/p3ol/react-access/commit/ba338e50df1a0d53792777fff00e0b64549b8e3d))
* **deps:** update dependency core-js to v3.8.1 ([7686a62](https://github.com/p3ol/react-access/commit/7686a621c88f3d8c277ff8937ca38ce2eef8bc31))
* **deps:** update dependency core-js to v3.8.2 ([86b2d1e](https://github.com/p3ol/react-access/commit/86b2d1e132543c4e836cbc34e6e8f9c162c1336a))
* **deps:** update dependency core-js to v3.8.3 ([95ff22c](https://github.com/p3ol/react-access/commit/95ff22c7b165c702cd6b2e559999d46f6a11f613))

### [1.0.1](https://github.com/p3ol/react-access/compare/v1.0.0...v1.0.1) (2020-11-10)


### Bug Fixes

* fix missing extential check ([7e33633](https://github.com/p3ol/react-access/commit/7e33633c88e116324c39314ea832e4bd0c80aee7))
* **deps:** update dependency core-js to v3.7.0 ([94815e7](https://github.com/p3ol/react-access/commit/94815e7d70d3dbddcc8132dffc7079bd4cda7814))

## [1.0.0](https://github.com/p3ol/react-access/compare/v0.1.4...v1.0.0) (2020-10-14)


### Features

* add usePoool hook ([e81f63d](https://github.com/p3ol/react-access/commit/e81f63d41caffe4ae02f21d5e110f217c4242d4c))


### Bug Fixes

* fix wrong call to flush ([89a3bf8](https://github.com/p3ol/react-access/commit/89a3bf89b058d40b3fd811a3c895f0f9c1af056a))

### [0.1.4](https://github.com/p3ol/react-access/compare/v0.1.3...v0.1.4) (2020-08-13)


### Bug Fixes

* fix npm package missing dist folder ([9f8434d](https://github.com/p3ol/react-access/commit/9f8434d133c2cd725021c7d001b1651dfa3aa779))

### [0.1.3](https://github.com/p3ol/react-access/compare/v0.1.2...v0.1.3) (2020-08-13)

### [0.1.2](https://github.com/p3ol/react-access/compare/v0.1.1...v0.1.2) (2020-07-13)

### [0.1.1](https://github.com/p3ol/react-access/compare/v0.1.0...v0.1.1) (2020-06-05)


### Bug Fixes

* update outdated lockfile ([858c24a](https://github.com/p3ol/react-access/commit/858c24a0e80de23293b92529dddaa16ff00ec9a3))

## [0.1.0](https://github.com/p3ol/react-access/compare/v0.0.1-alpha.2...v0.1.0) (2020-06-05)


### ⚠ BREAKING CHANGES

* enable tree-shaking

### Features

* enable tree-shaking ([0d8676c](https://github.com/p3ol/react-access/commit/0d8676c2bd99b59cd946314222d980bf7d62899d))


### Bug Fixes

* fix missing clean command ([fe8207e](https://github.com/p3ol/react-access/commit/fe8207eda5fa3c83794b631769e59f19dfa40fff))

## [0.0.1-alpha.2](https://github.com/p3ol/react-access/compare/v0.0.1-alpha.1...v0.0.1-alpha.2) (2020-05-12)



## [0.0.1-alpha.1](https://github.com/p3ol/react-access/compare/3e9be74c83fa5d9212f0cf4b363b83c68a9bb5b3...v0.0.1-alpha.1) (2020-05-12)


### Features

* add components ([3e9be74](https://github.com/p3ol/react-access/commit/3e9be74c83fa5d9212f0cf4b363b83c68a9bb5b3))
