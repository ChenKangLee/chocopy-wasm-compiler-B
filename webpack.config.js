const path = require('path');
const { ConcatenationScope } = require('webpack');
const webpack = require('webpack');

module.exports = {
  entry: './webstart.ts',
  module: {
    noParse: /browserfs\.js/,
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /(node_modules|tests)/,
      },
    ],
  },
  devtool: 'inline-source-map',
  externals: {
    wabt: 'wabt'
  },
  resolve: {
    extensions: ['.ts'],
    alias: {
      'fs': 'browserfs/dist/shims/fs.js',
      'buffer': 'browserfs/dist/shims/buffer.js',
      'path': 'browserfs/dist/shims/path.js',
      'processGlobal': 'browserfs/dist/shims/process.js',
      'bufferGlobal': 'browserfs/dist/shims/bufferGlobal.js',
      'bfsGlobal': require.resolve('browserfs')
    }
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'webstart.js'
  },
  plugins: [
    new webpack.ProvidePlugin({ BrowserFS: 'bfsGlobal', process: 'processGlobal', Buffer: 'bufferGlobal' })
  ]
};
