import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import { terser } from 'rollup-plugin-terser';

const defaultPlugins = [
  eslint(),
];

const defaultExternals = [
  'react',
];

const defaultGlobals = {
  react: 'React',
};

export default [
  // umd
  {
    input: './src/index.js',
    plugins: [
      ...defaultPlugins,
      babel({
        exclude: 'node_modules/**',
      }),
      resolve(),
      commonjs(),
      terser(),
    ],
    external: defaultExternals,
    output: {
      file: 'dist/poool-react-access.min.js',
      format: 'umd',
      name: 'PooolReactAccess',
      sourcemap: true,
      globals: defaultGlobals,
    },
  },

  // cjs
  {
    input: './src/index.js',
    plugins: [
      ...defaultPlugins,
      babel({
        exclude: 'node_modules/**',
      }),
      resolve(),
      commonjs(),
      terser(),
    ],
    external: defaultExternals,
    output: {
      file: 'dist/poool-react-access.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
  },

  // esm
  {
    input: './src/index.js',
    plugins: [
      ...defaultPlugins,
      babel({
        exclude: 'node_modules/**',
        externalHelpers: false,
        runtimeHelpers: false,
      }),
      resolve(),
    ],
    external: defaultExternals,
    output: {
      file: 'dist/poool-react-access.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  },
];
