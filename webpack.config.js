const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const dotenv = require('dotenv-webpack')

module.exports ={
  entry: {
      main: './src/index.js'
  },
  output: {
      path: path.join(__dirname, 'public'),
      publicPath: '/',
      filename: '[name].js'
  },
  plugins: [
    new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html",
        excludeChunks: [ 'server' ]
    }),
    new dotenv({ path: '.env' })
  ],
};
