const path = require('path')
const webpack = require('webpack')

let isProd = (process.env.NODE_ENV === 'production')

let outputFile = 'acacha-forms.js'

if (isProd) {
  outputFile = 'acacha-forms.min.js'
}

module.exports = {
  entry: './src/Form.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: outputFile,
    libraryTarget: 'umd',
    library: 'AcachaForm',
    umdNamedDefine: true
  },
  externals: {
    'axios': {
      commonjs: 'axios',
      commonjs2: 'axios',
      amd: 'axios',
      root: 'axios'
    }
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      axios: 'axios',
      'window.axios': 'axios'
    })
  ]
}
