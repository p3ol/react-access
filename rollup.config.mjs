import path from 'path';
import { fileURLToPath } from 'url';

import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';

// @rollup/plugin-terser v0.2.0 __filename missing issue for esm config
const __filename = fileURLToPath(import.meta.url);
globalThis.__filename = globalThis._filename || __filename;

const input = './src/index.js';
const output = './dist';
const name = 'poool-react-access';
const formats = ['umd', 'cjs', 'esm'];

const defaultExternals = ['react'];
const defaultGlobals = {
  react: 'React',
};

const defaultPlugins = [
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'runtime',
  }),
  resolve(),
  commonjs(),
  terser(),
];

export default [...formats.map(f => ({
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
})), {
  input: './src/index.d.ts',
  output: [{ file: `dist/${name}.d.ts`, format: 'es' }],
  plugins: [dts()],
}];
