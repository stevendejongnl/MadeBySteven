import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'
import typescriptCompiler from 'ts-patch/compiler/typescript.js'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import swc from '@rollup/plugin-swc'

const swcConfig = {
  minify: true,
  jsc: {
    target: "es2022"
  }
}

const bundleIt = (input, name, outputFileName) => ({
  input: input,
  output: [
    {
      file: outputFileName,
      format: 'umd',
      sourcemap: true,
      name: name,
    }
  ],
  plugins: [
    json(),
    typescript({
      typescript: typescriptCompiler,
      sourceMap: true,
    }),
    resolve(),
    commonjs(),
    swc({
      swc: swcConfig
    })
  ],
})

export default [
  bundleIt('src/main.ts', 'MadeBySteven', 'dist/main.js'),
]
