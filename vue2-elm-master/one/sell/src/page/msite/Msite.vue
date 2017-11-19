<template>
  <div>
    <head-top signin-up='msite'>
      <router-link :to="'/search/' + geohash" class="link_search" slot="search">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
          <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </router-link>
      <router-link to="/home" slot="msite-title" class="msite_title">
        <span class="title_text ellipsis">{{msiteTitle}}</span>
      </router-link>
    </head-top>
    <!--swiper start-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide food_types_container" v-for="(item, index) in foodTypes" :key="index">
            <!--<router-link :to="{path: '/food', query: {geohash, title: foodItem.title, restaurant_category_id: getCategoryId(foodItem.link)}}" v-for="foodItem in item" :key="foodItem.id" class="link_to_food"> -->
              <router-link :to="{path: '/food', query: {geohash}}" v-for="foodItem in item" :key="foodItem.id" class="link_to_food">
              <figure>
                <img :src="imgBaseUrl + foodItem.image_url">
                <figcaption>{{foodItem.title}}</figcaption>
              </figure>
            </router-link>
          </div>
        </div>
        <!--分页器-->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--swiper end-->
    <!--商家列表 start-->
    <div class="shop_list_container">
      <header class="shop_header">
        <span class="shop_header_title">附近商家</span>
      </header>
      <shop-list v-if="hasGetData" :geohash="geohash"></shop-list>

    </div>
    <!--商家列表  end-->
    <!--底部导航 start-->
    <foot-guide></foot-guide>
    <!--底部导航 end-->
  </div>
</template>
<style lang="stylus" rel="stylesheet">
  @import "../../style/index.styl"
  @import '../../plugins/swiper/swiper.css'
  .link_search
    width: .95rem
    height: .95rem
    position absolute
    top .5rem
    left .55rem
  .msite_title
    width: 8rem
    height: 1.55rem
    line-height 1.55rem
    position absolute
    top .2rem
    left 50%
    transform translateX(-50%)
    .title_text
      width: 100%
      display inline-block
      font-size .7rem
      color #fff
  .msite_nav
    padding-top 2rem
    width: 100%
    height: 10.6rem
    background-color: #fff
    border-bottom 1px solid #e4e4e4
    .swiper-container
      width: 100%
      height: 100%
      .swiper-wrapper
        height 100%
        .food_types_container
          height 100%
          display flex
          flex-direction row
          justify-content space-between
          flex-wrap: wrap
          align-items: flex-start
          .link_to_food
            flex: 0 0 25%
            height 50%
            figure
              position relative
              width: 100%
              height: 100%
              text-align center
              overflow hidden
              img
                position absolute
                left 50%
                transform translateX(-50%)
                height: 50%
                bottom 1.5rem
                vertical-align baseline
              figcaption
                position: absolute
                bottom .2rem
                width: 100%
                height: 1rem
                line-height 1rem

  .shop_list_container
    margin-top .4rem
    margin-bottom: 1.95rem
    border-top 1px solid #e4e4e4
    background-color: #fff
    .shop_header
      height 1rem
      line-height 1rem
      .shop_icon
        margin-left .6rem
        display inline-block
        vertical-align middle
        width: .6rem
        height: .6rem
      .shop_header_title
        margin-left .6rem
        display inline-block
        vertical-align middle
        font-size .6rem
</style>
<script type="text/ecmascript-6">
  import headTop from '../../components/header/Header.vue'
  import shopList from '../../components/common/shoplist.vue'
  import footGuide from '../../components/footer/footGuide.vue'
  import {cityGuess, msiteAdress, msiteFoodTypes } from '../../service/getData'
  import {mapMutations, mapState} from 'vuex'
  import {loadMore} from '../../components/common/mixin'
  import Swiper from 'swiper'
  //避免重复引入同一个插件或文件
  // import Swiper from '../../plugins/swiper/swiper.js'
  export default {
    props: {
    },
    data(){
      return {
        geohash: '',
        msiteTitle: '',
        hasGetData: false, // 是否已经获取地理位置数据，
        foodTypes: [], //食品分类列表
        imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
      }
    },
    async beforeMount () {
      if(!this.$route.query.geohash){
        // 如果没有地址信息，就显示首页中默认的地址信息
        const address = await cityGuess()
        this.geohash = address.latitude + ',' + address.longitude
      }else {
        this.geohash = this.$route.query.geohash
      }
    //  保存geohash到vuex
      this.SAVE_GEOHASH(this.geohash)
      //  获取位置信息
      /* promise的这种用法也是将异步转化为同步的风格，await就是语法糖
       msiteAdress(this.geohash).then(res => {
       console.log(res.name);
       })*/
      let res = await msiteAdress(this.geohash)
      this.msiteTitle = res.name
      //记录当前经纬度
      this.RECORD_ADDRESS(res)
      this.hasGetData = true
    },
    mounted() {
      // console.log(this.$store.state.geohash)

      //  获取导航食品类型列表
      msiteFoodTypes(this.geohash).then(res => {
        // console.log(res);
        let resLength = res.length
        let resArr = [...res]
        let foodArr = []
        for (let i = 0, j = 0; i < resLength; i += 8, j++) {
          foodArr[j] = resArr.splice(0, 8)
        }
        this.foodTypes = foodArr
      }).then(() => {
        new Swiper('.swiper-container', {
          pagination: {
            el: '.swiper-pagination',
          },
          loop: true,

        })
      })
    },
    methods: {
      ...mapMutations([
        'RECORD_ADDRESS', 'SAVE_GEOHASH'
      ]),

    },

    components: {
      headTop,
      shopList,
      footGuide
    }
  }
</script>
