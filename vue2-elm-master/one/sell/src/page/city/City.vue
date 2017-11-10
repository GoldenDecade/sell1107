<template>
  <div class="city_container">
    <head-top :head-title="cityname" go-back="true">
      <router-link to="/home" slot="changecity" class="change_city">切换城市</router-link>
    </head-top>
    <!--@click.prevent 阻止默认提交-->
    <form class="city_form" @click.prevent>
      <div>
        <input type="search" name="city" placeholder="输入学校、商务楼、地址" class="city_input input_style" required v-model="inputValue">
      </div>
      <div>
        <input type="submit" name="submit" class="city_submit input_style" @click="postpois" value="提交">
      </div>
    </form>
    <header v-if="historytitle" class="pois_search_history">搜索历史</header>
    <ul class="getpois_ul">
      <li v-for="(item, index) in placelist" @click="nextPage(index, item.geohash)" :key="index">
        <h4 class="pois_name ellipsis" >{{item.name}}</h4>
        <p class="pois_address ellipsis">{{item.address}}</p>
      </li>
    </ul>
    <footer v-if="historytitle&&placelist.length" class="clear_all_history" @click="clearAll">清空所有</footer>
    <div class="search_none_place" v-if="placeNone">很抱歉！无搜索结果</div>
  </div>
</template>
<style lang="stylus" rel="stylesheet">
  @import '../../style/index.styl'
  .city_container
    .change_city
      position absolute
      top 50%
      right .4rem
      transform translateY(-50%)
      color #fff
    .city_form
      padding 2.35rem .6rem .6rem
      border-bottom 1px solid #e4e4e4
      background-color: #fff
      .city_input
        box-sizing border-box
        width: 100%
        height 1.5rem
        line-height 1.5rem
        border: 1px solid #e4e4e4
        margin-bottom .4rem
        padding-left .3rem
        color #3d3d3d
      .city_submit
        height 1.5rem
        line-height 1.5rem
        width 100%
        text-align center
        color #fff
        background-color: #4462ff
    .pois_search_history
      margin-left .5rem
    .getpois_ul
      border-top: 1px solid #e4e4e4
      background-color: #fff
      li
        padding .2rem
        text-align left
        h4
          line-height 1.5rem
          height 1.5rem
          padding-left .5rem
        p
          line-height 1.5rem
          height 1.5rem
          padding-left .5rem
          color #646464
    .clear_all_history
      line-height 1.5rem
      height 1.5rem
      width: 100%
      background-color: #fff
      text-align center
      border-top 1px solid #e4e4e4

</style>
<script type="text/ecmascript-6">
  import headTop from '../../components/header/Header.vue'
  import {currentcity, searchplace} from '../../service/getData'
  import {getStore, setStore, removeStore} from '../../utils/mUtils'
  export default {
    data(){
      return {
        inputValue: '',  //搜索地址
        historytitle: true,  // 默认显示搜索历史头部，点击搜索后隐藏
        placelist: [], // 搜索城市列表
        placeNone: false, // 搜索无结果，显示提示信息
        cityname: 'beijing', // 当前城市名字
        cityid: '', // 当前城市ID
        placeHistory: [], //历史搜索记录
      }
    },
    mounted() {
      // console.log(this.$route);
      this.cityid = this.$route.params.cityId
      //  获取当前城市名字
      currentcity(this.cityid).then(res => {
        this.cityname = res.name
      })
      this.initData()
    },
    methods: {
      initData(){
      //  获取搜索历史记录
        if(getStore('placeHistory')){
          this.placelist = JSON.parse(getStore('placeHistory'))
        }else {
          this.placelist = []
        }
      },
      //发送搜索信息   输入值不为空才发送信息,获取检索信息
      postpois(){
        if (this.inputValue) {
          searchplace(this.cityid, this.inputValue).then(res => {
            this.historytitle = false
            this.placelist = res
            this.placeNone = res.length ? false : true
          })
        }
      },
      // geohash 是经纬度
      nextPage(index, geohash) {
        //  点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录，如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
        let history = getStore('placeHistory')
        let choosePlace = this.placelist[index]
        if(history){
          let checkrepeat = false
          this.placeHistory = JSON.parse(history)
          this.placeHistory.forEach(item => {
            if(item.geohash == geohash){
              checkrepeat = true
            }
          })
          if(!checkrepeat){
            this.placeHistory.push(choosePlace)
          }
        }else {
          this.placeHistory.push(choosePlace)
        }
        // console.log(this.placeHistory);
        setStore('placeHistory', this.placeHistory)
        this.$router.push({path: '/msite', query: {geohash}})
      },
      clearAll(){
        console.log('clear all');
      }
    },
    components: {
      headTop
    }
  }
</script>
