const path = require('path')
const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const fs = require("fs");
const md5 = require('md5')
const physicalCpus = require("physical-cpu-count");
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
  const threads = process.env.THREADS || (physicalCpus > 3 ? 2 : 1);

  // eslint-disable-next-line no-console
  console.log(
      `INFO: cpus: ${cpus} physical: ${physicalCpus} thread-loader threads: ${threads}`);

  return threads;
}

module.exports = webpackConfig