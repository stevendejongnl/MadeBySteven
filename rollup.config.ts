import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import beep from '@rollup/plugin-beep'

export default {
  input: 'src/main.ts',
  output: {
    file: 'public/assets/main.js',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    beep({
      sound: 'beep',
      onWarn: (warning, rollupWarn) => {
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
          return;
        }
        rollupWarn(warning);
      },
    }),
  ],
};