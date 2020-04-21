module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/transform-runtime',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-object-rest-spread',
  ],
  // env: {
  //   serve: {
  //     presets: [
  //       ['@babel/preset-env', {
  //         corejs: 3,
  //         useBuiltIns: 'usage',
  //       }],
  //     ],
  //     plugins: [
  //       ['@babel/plugin-transform-runtime', {
  //         corejs: 3,
  //         helpers: true,
  //         regenerator: true,
  //         useESModules: false,
  //       }],
  //     ],
  //   },
  // },
};
