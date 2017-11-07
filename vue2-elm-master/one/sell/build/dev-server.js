//  npm run dev时，先执行的是build/dev-server.js文件。 ‘node build/dev-server.js’
/*
* 1. 检查node和npm的版本、引入相关插件和配置
* 2. webpack对源码进行编译打包并返回compiler对象
* 3. 创建express服务器
* 4. 配置开发中间件（webpack-dev-middleware）和热重载中间件（webpack-hot-middleware）
* 5. 挂载代理服务和中间件
* 6. 配置静态资源
* 7. 启动服务器监听特定端口（8080）
* 8. 自动打开浏览器并打开特定网址（localhost:8080）
* express服务器提供静态文件服务，不过它还使用了http-proxy-middleware,一个http请求代理的中间件。
* 前端开发过程中需要使用到后台的API的话，可以通过配置proxyTable来将相应的后台请求代理到专用的API服务器。
* */
'use strict'
require('./check-versions')() //检查nodeJS 和 npm的版本

// 获取基本配置
const config = require('../config')
// 如果node的环境变量中没有设置当前的环境（NODE_ENV），则使用config中的dev环境配置作为当前的环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

// opn是一个可以调用默认软件打开网址、图片、文件等内容的插件
const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
// http-proxy-middleware是一个express中间件，用于将http请求代理到其他服务器
const proxyMiddleware = require('http-proxy-middleware')
// webpack根据环境选择配置
const webpackConfig = (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production')
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
// process是指当前node程序的进程  process.env 返回用户的环境变量
const port = process.env.PORT || config.dev.port  // 配置端口号

// automatically open browser, if not set will be false
// 设置是否自动打开浏览器
const autoOpenBrowser = !!config.dev.autoOpenBrowser  // 两个!!就是Boolean()的简写

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// http代理表，指定规则，将某些API请求代理到相应的服务器
const proxyTable = config.dev.proxyTable

// 创建express服务器
const app = express()
// webpack根据配置开始编译打包源码并返回compiler对象
const compiler = webpack(webpackConfig)


// 将这个中间件挂到express上使用之后即可提供这些编译后的产品文件服务
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath, // 设置访问路径为webpack配置中的output里面所对应的路径
  quiet: true // 设置为true，使其不要在控制台输出日志
})

// werbpack-hot-middleware  用于实现热重载功能的中间件
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,  // 关闭控制台的入职输出
  heartbeat: 2000  // 发送心跳包的频率
})
// force page reload when html-webpack-plugin template changes
// currently disabled until this is resolved:
// https://github.com/jantimon/html-webpack-plugin/issues/680
// webpack重新编译打包完成后并将js、css等文件注入到HTML文件之后，通过热重载中间件强制页面刷新
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// enable hot-reload and state-preserving
// compilation error display
//挂载热重载中间件（express使用第三方插件）
app.use(hotMiddleware)

// proxy api requests
// 根据proxyTable中的代理请求配置来设置express服务器的http代理规则
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  // proxyMiddleware()第一个参数可以是数组,第二个参数依然为一个对象{target, changeOrigin}
  // 详情查看Github cangdu的代码
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
// 重定向不存在的url，用于支持SPA（单页应用）
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
//挂在webpack-dev-middleware中间件，提供webpack编译打包后的产品文件服务
app.use(devMiddleware)

// serve pure static assets
//提供static文件夹上的静态文件服务  path.posix指跨平台使用path的方法
//  path.posix.join() 姑且认为是path.join()  路径的拼接
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// 如果你希望所有通过express.static访问的文件都存放在一个“虚拟（virtual）”目录（即这个目录根本不存在）下面，可以通过为静态资源目录指定一个挂载路径的方式来实现
app.use(staticPath, express.static('./static')) // 这样HTML的文件中引入的css js文件路径就要相对于./static来写  而且要写成 /css/index.css 这种样子 （必须）

//访问链接
const uri = 'http://localhost:' + port

//创建promise，在应用服务启动之后resolve
//便于外部文件require了这个dev-server之后的代码编写
var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

var server
var portfinder = require('portfinder') // 获取当前环境的端口号  A simple tool to find an open port on the current machine
portfinder.basePort = port

console.log('> Starting dev server...')

//webpack-dev-middleware 等待webpack完成所有编译打包之后输出提示语到控制台，表明服务正式启动
//服务正式启动才能自动打开浏览器进入页面
devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, port) => { //确保端口没有被占用
    if (err) {
      _reject(err)
    }
    process.env.PORT = port
    var uri = 'http://localhost:' + port
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
    //启动express服务器，并监听相应的端口
    server = app.listen(port)
    _resolve()
  })
})

//暴露本模块的功能给外部使用，例如下面这种用法
// var devServer = require('./build/dev-server.js')
// devServer.ready.then(() => {...})
// if(...){devServer.close()}
module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
