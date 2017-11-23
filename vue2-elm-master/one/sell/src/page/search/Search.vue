<template>
  <div class="search_wrapper">
    <header-top go-back="true" head-title="搜索"></header-top>
    <form class="search_form">
      <input class="search_input" type="search" name="search" placeholder="请输入" @input="checkInput" v-model="searchValue"/>
      <input class="search_submit" type="submit" name="submit" @click.prevent="searchTarget('')"/>
    </form>
    <section v-if="restaurantList.length" class="search_res">
      <h4>商家</h4>
      <ul>
        <router-link :to="{path: '/shop', query: {id: item.id}}" v-for="item in restaurantList" tag="li" :key="item.id" class="list_li">
          <section class="item_left">
            <img :src="imgBaseUrl + item.image_path" class="restaurant_img">
          </section>
          <section class="item_right">
            <p>{{item.name}}</p>
            <p>月售 {{item.month_sales||item.recent_order_num}} 单</p>
            <p>{{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离{{item.distance}}</p>
          </section>
        </router-link>
      </ul>
    </section>
    <section v-if="historyList.length && showHistory" class="search_history">
      <ul>
        <li v-for="(item, index) in historyList" :key="index" class="history_item">
          <span class="history_text ellipsis" @click="searchTarget(item)">{{item}}</span>
          <span class="del_item" @click="del(index)">×</span>
        </li>
      </ul>
    </section>
    <div class="search_none" v-if="emptyResult">很抱歉！无搜索结果</div>
  </div>
</template>
<style rel="stylesheet" lang="stylus">
  @import "../../style/index.styl"
  .search_wrapper
    width: 100%
    .search_form
      padding 2.45rem .5rem .5rem
      background-color: #fff
      .search_input
        padding .2rem
        width 11rem
        height 2rem
        line-height 2rem
        border-radius .2rem
        background-color: #e4e4e4
      .search_submit
        margin-left .3rem
        width 3rem
        height 2rem
        line-height 2rem
        text-align center
        color #fff
        border-radius .2rem
        background-color: #59a9ff
    .search_res
      h4
        height: 1.5rem
        line-height 1.5rem
        padding-left .4rem
        border: 1px solid #e4e4e4
      ul
        .list_li
          padding .4rem
          display flex
          justify-content space-between
          background-color: #fff
          .item_left
            flex 0 0 4rem
            height 4rem
            .restaurant_img
              width: 100%
              height: 100%
              display inline-block
              vertical-align middle
          .item_right
            margin-left .5rem
            flex 1 1 auto
            text-align left
    .search_none
      width: 100%
      height: 2rem
      line-height 2rem
      text-align center
      background-color: #e4e4e4
    .search_history
      .history_item
        padding 0 .4rem
        display flex
        justify-content space-between
        background-color: #fff
        height 1.5rem
        line-height 1.5rem
        .history_text
          flex 0 0 8rem
        .del_item
          flex 0 0 1rem
</style>
<script type="text/ecmascript-6">
  import headerTop from '../../components/header/Header.vue'
  import footGuide from '../../components/footer/footGuide.vue'
  import {searchRestaurant} from '../../service/getData'
  import {getStore, setStore} from '../../utils/mUtils'
  export default {
    data(){
      return {
        geohash: '',// 发送请求时候用的
        searchValue: '',
        restaurantList: [],// 搜索的结果
        emptyResult: false, // 搜索结果是否为空
        imgBaseUrl: 'https://fuss10.elemecdn.com/', //图片域名地址
        historyList: [],
        showHistory: true, // 是否显示历史记录
      }
    },
    mounted(){
      localStorage.removeItem('historyList')
      this.geohash = this.$route.params.geohash
      if (getStore('historyList')) {
        this.historyList = JSON.parse(getStore('historyList'))
      }
    },
    methods: {
      checkInput(){
        if (!this.searchValue) {
          this.emptyResult = false
          this.restaurantList = []
          this.showHistory = true
        }
      },
      async searchTarget(val){
        //点击提交按钮，搜索结果并显示，同时将搜索内容存入历史记录
        if (val) {  // 这一步的操作：在历史记录中点击某一列，将其放到搜索框中，同时进行搜索（赞）
          this.searchValue = val
        } else if (!this.searchValue) {
          return
        } else if (this.searchValue.trim().length < 1) {
          return
        }
        this.showHistory = false
        //  获取搜索结果
        this.restaurantList = await searchRestaurant(this.geohash, this.searchValue)
        if (!this.restaurantList.length) {
          this.emptyResult = true
        }
        let history = getStore('historyList')
        console.log(this.searchValue);
        if (history) {
          let checkrepeat = this.historyList.some(elem => elem == this.searchValue)
          console.log('checkrepeat: ', checkrepeat);
          if (!checkrepeat) {
            this.historyList.push(this.searchValue)
          }
        } else {
          this.historyList.push(this.searchValue)
        }
        setStore('historyList', this.historyList)
      },
      //  删除某一条历史记录
      del(index){
        this.historyList.splice(index, 1)
        localStorage.historyList = JSON.stringify(this.historyList)
      }
    },
    components: {headerTop, footGuide}
  }
</script>
