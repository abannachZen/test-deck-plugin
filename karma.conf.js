const path = require('path')
const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const fs = require("fs");
const md5 = require('md5')
const CACHE_INVALIDATE = getCacheInvalidateString()
const THREADS = getThreadLoaderThreads()

/** @type { import('@types/webpack').webpack.Configuration } */
const webpackConfig = {
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        loader: 'null-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'cache-loader',
            options: {cacheIdentifier: CACHE_INVALIDATE}
          },
          {loader: 'thread-loader', options: {workers: THREADS}},
          {loader: 'babel-loader'},
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'cache-loader',
            options: {cacheIdentifier: CACHE_INVALIDATE}
          },
          {loader: 'thread-loader', options: {workers: THREADS}},
          {loader: 'ts-loader', options: {happyPackMode: true}}
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [
      // Automatically aliases 'paths' defined in tsconfig.json
      new TsconfigPathsPlugin()
    ],
    fallback: {
      "root/version.json": false
    }
  },
  plugins: [new ForkTsCheckerWebpackPlugin(
      {typescript: {diagnosticOptions: {syntactic: true, semantic: true}}})]
}

function getCacheInvalidateString() {
  return JSON.stringify({
    YARN_LOCK: md5(fs.readFileSync(path.resolve(__dirname, 'yarn.lock'))),
    WEBPACK_CONFIG: md5(fs.readFileSync(__filename)),
  });
}

function getThreadLoaderThreads() {
  const cpus = require('os').cpus().length;
  const physicalCpus = require('physical-cpu-count');
  const threads = process.env.THREADS || (physicalCpus > 3 ? 2 : 1);

  // eslint-disable-next-line no-console
  console.log(
      `INFO: cpus: ${cpus} physical: ${physicalCpus} thread-loader threads: ${threads}`);

  return threads;
}

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',
    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ['jasmine', 'webpack'],

    // list of files / patterns to load in the browser
    files: [
      // {pattern: 'tests/**/*.spec.+(ts|js|tsx|jsx)', watched: false}
      {pattern: './karma-shim.js', watched: false}
    ],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
      './karma-shim.js': ['webpack', 'sourcemap']
      // 'tests/**/*.spec.+(ts|js|tsx|jsx)': ['webpack', 'sourcemap']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: ['jsdom'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser instances should be started simultaneously
    concurrency: Infinity,

    browserConsoleLogOptions: {
      level: 'log',
      terminal: true
    },
    webpack: webpackConfig
  })
}
