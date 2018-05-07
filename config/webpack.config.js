const path = require('path')
const webpack = require("webpack");
const HTMLPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  stats: {
    all: false,
    // 添加资源信息
    assets: true,
    errors: true,
    timings: true,
    version: true,
    warnings: true,
  },
  entry: {
    app: resolve("src/index.js")
  },
  output: {
    path: resolve("dist"),
    filename: "bundle.[hash].js"
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
        exclude: [resolve("node_modules")]
      },
      {
        test: /\.css$/,
        // 分离css与js
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader"]
        })
      },
      //配置file-loader，加载图片，字体资源
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/,
        loader: "file-loader?limit=50000&name=[path][name].[ext]"
      }
    ]
  },
  plugins: [
    new HTMLPlugin({
      template: resolve("index.html")
    }),
    // 自动加载模块，而不必到处 import 或 require 。
    new webpack.ProvidePlugin({
      React: "react",
      PropTypes: "prop-types"
    }),
    // 打包的css文件名
    new ExtractTextPlugin("main.css"),
    // 模块热替换插件
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // 提供带 Content-Encoding 编码的压缩版的资源
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp("."),
      threshold: 10240,
      minRatio: 0.8
    }),
    // 减少文件大小
    new webpack.optimize.AggressiveMergingPlugin() //合并块
  ],
  devServer: {
    port: 8080,
    contentBase: resolve("dist"),
    // 一切服务都启用gzip 压缩
    compress: true,
    hot: true,
    inline: true,
    // 服务器外部可访问
    host: "0.0.0.0",
    open: true,
    // 控制输出信息
    stats: "minimal"
  }
};
