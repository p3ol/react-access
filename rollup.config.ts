import path from 'node:path';

import type { ModuleFormat, RollupOptions } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import swc from '@rollup/plugin-swc';

const input = './src/index.js';
const output = './dist';
const name = 'poool-react-access';
const formats: ModuleFormat[] = ['umd', 'cjs', 'esm'];

const defaultExternals = ['react', 'react-dom'];
const defaultGlobals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

const defaultPlugins = [
  swc({
    swc: {
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: true,
        },
      },
      env: {
        targets: '>=0.2% and not dead',
      },
    },
  }),
  commonjs({ include: /node_modules/ }),
  resolve({
    extensions: ['.js', '.ts', '.tsx', '.json', '.node'],
  }),
  terser(),
];

const configs: RollupOptions[] = [
  ...formats.map((f: ModuleFormat): RollupOptions => ({
    input,
    plugins: [
      ...defaultPlugins,
    ],
    external: defaultExternals,
    output: {
      ...(f === 'esm' ? {
        dir: `${output}/esm`,
        chunkFileNames: '[name].js',
      } : {
        file: `${output}/${name}.${f}.js`,
      }),
      format: f,
      name: 'PooolReactAccess',
      sourcemap: true,
      globals: defaultGlobals,
      ...(f === 'esm' ? {
        manualChunks: id => {
          return id.includes('node_modules')
            ? 'vendor'
            : path.parse(id).name;
        },
      } : {}),
    },
  })),
];

export default configs;
