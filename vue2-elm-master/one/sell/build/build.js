/*
* npm run build
* 1、 loading动画
* 2、 删除目标文件夹
* 3、 执行webpack构建
* 4、 输出信息
* webpack编译之后会输出到配置里面指定的目标文件夹；
* 删除目标文件夹之后再创建时为了去除旧的内容，以免产生不可预测的影响
* */
'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'
//ora 一个可以在终端显示spinner的插件
const ora = require('ora')
//rm, 用于删除文件或文件夹的插件
const rm = require('rimraf')
const path = require('path')
//chalk 用于在控制台输出带颜色字体的插件
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
//开启loading动画
spinner.start()

// 首先将整个dist里面的文件及文件夹全部删除，然后再用webpack进行构建打包
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  //删除完成之后构建打包
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
