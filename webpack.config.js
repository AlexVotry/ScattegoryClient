const path = require('path');
const webpack = require('webpack');
const rules = [
  {
    test: /\.(js|jsx|tsx|ts)$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: { presets: ["@babel/env"] }
  },
  {
    test: /\.css$/,
    use: ["style-loader", "css-loader"]
  },
  {
    test: /\.(png|jpe?g|svg)$/,
    loader: 'file-loader',
    options: {
      name: 'assets/[name].[ext]',
    }
  }
]

module.exports = {
  target: 'web',
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: { rules },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx']
  },
  devServer: {
    contentBase: './',
    port: 5000
  }
}