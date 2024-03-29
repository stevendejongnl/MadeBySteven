/* jshint esversion: 6 */
/* jshint strict: false */

import typescript from 'rollup-plugin-typescript2'
import summary from 'rollup-plugin-summary'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/main.js',
    format: 'esm',
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`)
    }
  },
  plugins: [
    typescript(),
    replace({ 'preventAssignment': true, 'Reflect.decorate': 'undefined' }),
    resolve(),
    summary(),
    postcss({
      extract: true,
      minimize: true,
    }),
  ],
}