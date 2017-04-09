const Webpack = require('webpack')
const Path = require('path')

const LibraryName = 'ReduxEm'
const OutputFile = LibraryName + '.js'

const config = {

  entry: Path.resolve('./source/index.js'),

  output: {
    path: Path.resolve('./lib'),
    filename: OutputFile,
    library: LibraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },

  module: {
    loaders: [
      {
        test: /(\.js)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /(\.js)$/,
        use: "eslint-loader",
        exclude: /node_modules/,
      }
    ]
  },

  resolve: {
    extensions: [ '.js' ],
    modules: [
      Path.resolve(__dirname, '../../node_modules'),
      Path.resolve(__dirname, '../../source'),
    ],
  },

  plugins: new Webpack.optimize.UglifyJsPlugin(),

  devtool: 'source-map',
}

module.exports = config
