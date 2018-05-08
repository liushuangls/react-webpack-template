# React + Webpack 项目模板
[![Build Status](https://travis-ci.org/liushuangbill/react-webpack-template.svg?branch=master)](https://travis-ci.org/liushuangbill/react-webpack-template)

## use:
```npm
git clone git@github.com:liushuangbill/react-webpack-template.git your-app-name

cd your-app-name

git remote set-url origin your-git-url // 修改远程仓库地址

npm i

npm start // 开发模式运行

npm run build // 打包项目

// 使用Webpack ProvidePlugin插件引入React，不必重复引入，也可以定义自己的全局变量
```

## 目录结构
```
.
|-- config                           // webpack配置目录
|-- dist                             // 打包输出目录
|-- src                              // 开发目录
|   |-- index.js                     // 打包入口文件
|-- .babelrc
|-- .editorconfig
|-- .postcssrc
|-- README.md
|-- package.json
|-- index.html
.
```
