import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import { terser } from 'rollup-plugin-terser';

const isExternal = id => /^react/.test(id);

const defaultPlugins = [
  eslint(),
  babel({
    exclude: 'node_modules/**',
    externalHelpers: true,
  }),
];

const defaultGlobals = {
  react: 'React',
};

export default [
  // poool-react-access.min.js
  {
    input: 'src/index.js',
    plugins: [
      ...defaultPlugins,
      resolve(),
      commonjs(),
      terser(),
    ],
    external: isExternal,
    output: {
      file: 'dist/poool-react-access.min.js',
      format: 'umd',
      name: 'poool-react-access',
      esModule: false,
      globals: defaultGlobals,
      sourcemap: true,
    },
  },
  // poool-react-access.cjs.js
  {
    input: 'src/index.js',
    plugins: [
      ...defaultPlugins,
    ],
    external: isExternal,
    output: {
      file: 'dist/poool-react-access.cjs.js',
      format: 'cjs',
      name: 'poool-react-access',
      globals: defaultGlobals,
      sourcemap: true,
    },
  },
  // esm
  {
    input: {
      index: 'src/index.js',
      Paywall: 'src/Paywall.js',
      PaywallContext: 'src/PaywallContext.js',
      RestrictedContent: 'src/RestrictedContent.js',
    },
    plugins: [
      ...defaultPlugins,
      resolve(),
    ],
    external: isExternal,
    output: {
      dir: 'dist/esm',
      format: 'esm',
      globals: defaultGlobals,
      sourcemap: true,
    },
  },
];
