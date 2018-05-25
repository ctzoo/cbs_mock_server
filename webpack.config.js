const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    port: 3002,
    open: true,
    proxy: {
      '/': 'http://localhost:3001',
      '/cbs': 'http://localhost:3001/cbs',
    },
    https: true,
  },
  module: {
    rules: [{ test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/ }, { test: /\.css$/, use: ['style-loader', 'css-loader'] }],
  },
}
