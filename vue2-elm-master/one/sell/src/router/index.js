import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import Header from 'components/header/Header.vue'
import Home from 'page/home/Home.vue'
import Login from 'page/login/Login.vue'


Vue.use(Router)
// 注意require.ensure与require之间的区别  笔记中记了
// require.ensure(dependencies: string[], callback: function([require]), [chunkName: String])
// dependencied: 以来的模块数组、
// callback: 回调函数，该函数调用时会传一个require参数
// chunkName: 模块名，用于构建时生成文件时命名使用
// require.ensure的模块只会被下载下来，不会被执行，只有在回调函数使用require（模块名）后，这个模块才会被执行
// const Home = r => require.ensure([], () => r(require('../page/home/Home.vue')), home)
// require.ensure(['page/home/Home.vue'], function(require) { console.log('ensure'); require('page/home/Home.vue')}, home);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/header',
      name: 'header',
      component: Header
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

