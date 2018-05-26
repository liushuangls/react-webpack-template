const path = require('path')
const webpackMerge = require("webpack-merge")
// 分离打包后的css文件
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const devConfig = require('./webpack-dev.config')
const pluginConfig = require('./webpack-plugin.config')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = webpackMerge(devConfig, pluginConfig, {
  entry: {
    app: resolve("src/index.js")
  },
  output: {
    path: resolve("dist"),
    filename: "bundle.[hash].js"
  },
  bail: true,
  stats: {
    all: false,
    // 添加资源信息
    assets: true,
    errors: true,
    timings: true,
    version: true,
    warnings: false,
    colors: true
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@": resolve("src")
    }
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        loader: "babel-loader",
        include: [resolve("src")]
      },
      {
        test: /\.css$/,
        // 分离css与js
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader"]
        }),
        include: [resolve("src")]
      },
      //配置file-loader，加载图片，字体资源
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/,
        loader: "file-loader?limit=50000&name=[path][name].[ext]"
      }
    ]
  }
});
