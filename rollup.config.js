import chalk from 'chalk'
import os from 'os'
import { getLogFilter } from 'rollup/getLogFilter'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import swc from '@rollup/plugin-swc'
import { visualizer } from 'rollup-plugin-visualizer'
import analyze from 'rollup-plugin-analyzer'

const toBytes = (size) => {
  const match = size.match(/(\d+(\.\d+)?)(\w+)/)
  if (!match) {
    return 0
  }

  const [, num, , unit] = match
  const units = {
    B: 1,
    KB: 1e3,
    MB: 1e6,
    GB: 1e9,
    TB: 1e12,
  }

  return parseFloat(num) * units[unit]
}

const limitBytes = toBytes('0.5MB')

const onAnalysis = ({ bundleSize }) => {
  if (bundleSize < limitBytes) {
    return
  }

  console.warn(chalk.yellow(`Bundle size exceeds ${limitBytes} bytes: ${bundleSize} bytes`))

  return
}

const analyzeFile = (input) => ({
  input: input,
  output: {
    file: `${os.tmpdir()}/madebysteven/${input}`,
  },
  logLevel: 'silent',
  plugins: [
    analyze({
      summaryOnly: true,
      onAnalysis,
    })
  ]
})

const swcConfig = {
  minify: true,
  jsc: {
    target: 'es2022'
  }
}

let thisIsUndefined = 0
const bundleConfig = (input, namespace, outputName, minified = true) => ({
  input: input,
  output: [
    {
      file: `dist/${outputName}${minified ? '.min' : ''}.js`,
      sourcemap: 'inline',
      format: 'umd',
      name: namespace,
    }
  ],
  onLog(level, log, handler) {
    const circularDependency = getLogFilter(['code:CIRCULAR_DEPENDENCY'])(log)
    const theSentryCircularDependencyShit = log.message.includes('node_modules/@sentry/core')
    // https://github.com/getsentry/sentry-javascript/issues/11553

    if (circularDependency && theSentryCircularDependencyShit) {
      return
    }

    if (getLogFilter(['code:THIS_IS_UNDEFINED'])(log)) {
      thisIsUndefined++
    }
    if (thisIsUndefined > 0 && thisIsUndefined < 2) {
      console.warn(chalk.yellow(log.message, '\n', log.url))
      return
    }
    if (thisIsUndefined > 1) {
      return
    }

    handler(level, log)
  },
  plugins: [
    json(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: 'tsconfig.json',
    }),
    visualizer({
      filename: `dist/${outputName}${minified ? '-min' : ''}-stats.html`,
      sourcemap: true
    }),
    minified ? swc({
      swc: swcConfig
    }) : null,
  ]
})

export default [
  bundleConfig('src/main.ts', 'MadeBySteven', 'bundle'),

  analyzeFile('dist/bundle.min.js'),
]
