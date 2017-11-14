/*
* 1. 配置webpack编译入口
* 2. 配置webpack输出路径和命名规则
* 3. 配置模块resolve规则
* 4. 配置不同类型模块的处理规则
* */
'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

//获取绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
//配置项
module.exports = {
  //入口文件
  entry: {
    app: './src/main.js'
  },
  //输出路径和命名规则
  output: {
    //build之后输出的目标文件夹路径  （例如： /dist）  与publicPath没有关系
    path: config.build.assetsRoot,
    //webpack输出bundle文件命名格式
    filename: '[name].js',
    //webpack编译打包之后的文件所放的目录名字    这里这些文件都放在了 static文件夹中了
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.styl'], // 一般不要加上空的扩展名 也许会出现错误
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'components': resolve('src/components'),
      'router': path.resolve(__dirname, '../src/router'),
      'assets': path.join(__dirname, '../src/assets'),
      'style': path.join(__dirname, '../src/style'),
      'page': path.join(__dirname, '../src/page')
    }
  },
  //不同类型模块的处理规则
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // 小于10K的图片转成base64编码的dataURL字符串写到代码中
          //其他的图片转移到静态资源文件夹中
          name: utils.assetsPath('img/[name].[hash:7].[ext]')  //这里对路径进行拼接了确保为static/img/。。。
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      /*{       // 其实 不需要写，在dev.conf.js中有专门配置css的
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /.less/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'scss-loader']
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      }*/
    ]
  }
}
