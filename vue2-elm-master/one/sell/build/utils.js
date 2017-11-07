/*
* 1、 计算资源文件存放路径
* 2、 生成cssloaders用于加载.vue文件中的样式
* 3、 生成styleloaders用于加载不在.vue文件中的单独存在的样式文件
* */
'use strict'
const path = require('path')
const config = require('../config')
//extract-text-webpack-plugin 可以提取bundle中的特定文本，将提取后的文本单独存放到另外的文件
//这里用来提取css样式
const ExtractTextPlugin = require('extract-text-webpack-plugin')

//module.exports 与 exports
//资源文件的存放路径
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

// 生成css、sass、scss等各种用来编写样式的语言所对应的loader配置
exports.cssLoaders = function (options) {
  options = options || {}
  //css-loader的配置
  const cssLoader = {
    loader: 'css-loader',
    options: {
      //是否最小化
      minimize: process.env.NODE_ENV === 'production',
      //是否使用source-map
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  //生成各种loader配置，并且配置了extract-text-plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified (which is the case during production build)
    if (options.extract) {
      //配置extract-text-plugin提取样式
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      //无需提取样式则简单使用vue-style-loader配合各种样式loader去处理style里面的样式
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
//生成处理单独的.css  .sass .stylus等样式文件的规则
exports.styleLoaders = function (options) {  // 返回的是一个数组
  const output = []
  const loaders = exports.cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
