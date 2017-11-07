
'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  build: {
    //环境变量
    // env: require('./prod.env'),
    env: {
      NODE_ENV: '"production"'
    },
    //HTML入口文件
    index: path.resolve(__dirname, '../dist/index.html'),
    //产品文件的存放路径
    assetsRoot: path.resolve(__dirname, '../dist'),   //输出的目标文件夹路径
    //二级目录 存放静态资源文件的目录，位于dist文件夹下
    assetsSubDirectory: 'static',
    //发布路径，如果构建后的产品文件有用于发布cdn或者放到其他域名的服务器，可以在这里进行设置
    //设置之后构建的产品文件在注入到index.html中的时候就会带上这里的发布路径
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    //是否开启gzip压缩
    productionGzip: false,
    //gzip模式下需要压缩的文件的扩展名，设置js、css之后就只会对js和css文件进行压缩
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    // env: require('./dev.env'), 这样就可以不引入dev.env.js了
    env: {
      NODE_ENV: '"development"'
    },
    port: process.env.PORT || 8081,
    autoOpenBrowser: true,  // 设置是否自动打开浏览器
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': { // api是指你发给后台的网址公共部分
        target: 'http://cangdu.org:8001',  // 匹配之后将localhost部分替换成target字段（正式网址）
        changeOrigin: true, // 解决跨域问题
        pathRewrite: {
          '^/api': '' // (还必须有这句)意思是 /api 替换http://cangdu.org:8001/ 那么原本需要请求http://cangdu.org:8001/v1/city  现在只请求 /api/v1/vity就可以了
          // '^/api': '/v1'   //意思是将url中的api换为v1   这里的api三个字母必须和上面41行的api三个字母一致
        }
      }
    },

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
