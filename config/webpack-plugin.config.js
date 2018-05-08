const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
// gizp压缩
const CompressionPlugin = require("compression-webpack-plugin");
// 分离打包后的css文件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '../index.html')
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
  ]
};
