<template>
  <div class="shoplist_container">
    <ul v-load-more="loaderMore" v-if="shopListArr.length"  type="1">
      <router-link :to="{path: 'shop', query: {geohash, id: item.id} }" v-for="item in shopListArr" tag="li" :key="item.id" class="shop_li">
        <section class="shop_left">
          <img :src="imgBaseUrl + item.image_path" class="shop_img">
        </section>
        <section class="shop_right">
          <header class="shop_detail_header">
            <h4 :class="item.is_premium ? 'premium' : ''" class="shop_title ellipsis">{{item.name}}</h4>
            <ul class="shop_detail_ul">
              <li v-for="item in item.supports" :key="item.id" class="supports">{{item.icon_name}}</li>
            </ul>
          </header>

          <h5 class="rating_order_num">
            <section class="rating_order_num_left">
              <section class="rating_section">
                <span class="rating_num">{{item.rating}}</span>
              </section>
              <section class="order_section">
                月售{{item.recent_order_num}}单
              </section>
            </section>
            <section class="rating_order_num_right">
              <span class="delivery_style delivery_left">{{item.delivery_mode.text}}</span>
              <span class="delivery-style delivery_right">准时达</span>
            </section>
          </h5>
          <h5 class="fee_distance">
            <p class="fee">
              ￥{{item.float_minimum_order_amount}}起送
              <span>/</span>
              {{item.piecewise_agent_fee.tips}}
            </p>
            <p class="distance_time">
              <span>{{item.distance > 1000 ? (item.distance / 1000).toFixed(2) + 'km' : item.distance + 'm'}}</span>
              <span class="segmentation">/</span>
              <span class="order_time">{{item.order_lead_time}}</span>
            </p>
          </h5>
        </section>
      </router-link>
    </ul>

    <p v-if="touchend" class="empty_data">没有更多了</p>
    <!--返回顶部按钮 start-->
    <div class="return_top" @click="backTop" v-if="showBackStatus">
      <svg class="back_top_svg">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
      </svg>
    </div>
    <!--返回顶部按钮 end-->
    <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState } from 'vuex'
  import {loadMore_directive} from './mixin.js'
  import {showBack, animate} from '../../utils/mUtils'
  import {shopList} from '../../service/getData'
  export default {
    data() {
      return {
        shopListArr: [], //店铺列表数据
        shopIsOver: false, //商品是否已经没有了  如果请求的商品数量小于everyReqShop，则表明已经没有更多商品了
        offset: 0, //批次加载店铺列表，每次请求商品列表的时候需要的参数，就像分页时候的数据位置一样
        limit: 20, //约定每次加载20个
        imgBaseUrl: 'http://cangdu.org:8001/img/', //图片地址
        showBackStatus: false, //显示返回顶部按钮
        showLoading: true, // 显示加载动画
        preventRepeatRequest: false, // 禁止重复请求
      }
    },
    props: [
      'geohash', 'restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect'
    ],
    mounted(){
      this.initData()
    },
    methods: {
      async initData (){
        let res = await shopList(this.latitude, this.longitude, this.offset, this.limit)
        // console.log(JSON.stringify(res[0]));
        this.shopListArr = [...res]
        if (res.length < 20) {
          this.shopIsOver = true
        }
        this.hideLoading()
      //  开始监听scrollTop的值，达到一定程度之后显示返回顶部按钮
        showBack(boolean => {
          this.showBackStatus = boolean
        })

      },
      async loaderMore() {
      //  到达底部加载更多数据
        if(this.shopIsOver){
          return
        }
        if(this.preventRepeatRequest) { // 禁止重复请求,其实就是一个标识，表示我现在正在请求着呢，你再拉也不能多次请求，必须等我把请求结果返回了 才行
          return
        }
        this.preventRepeatRequest = true  // 标识
        // 数据的定位每次都要加20
        this.offset += 20
        let res = await shopList(this.latitude, this.longitude, this.offset, this.limit, this.restaurantCategoryId)
        this.shopListArr = [...this.shopListArr, ...res]
        if(res.length < 20){
          this.shopIsOver = true
          return
        }
        this.preventRepeatRequest = false  // 标识
      },
      hideLoading(){
        this.showLoading = false
      },
      backTop(){
      //  返回顶部
        animate(document.body, {scrollTop: '0'}, 400, 'ease-out')
      }
    },
    computed: {
      ...mapState(['latitude', 'longitude'])
    },
//    mixins 的作用就是讲引入的组件、指令等混合到当前代码，如果引入的是组件，在相同的生命周期中有相同的函数则以当前组件的为准，否则都执行
    mixins: [loadMore_directive]


  }
</script>

<style rel="stylesheet" lang="stylus">
  @import '../../style/index.styl'
  div.shoplist_container
    ul
      .shop_li
        display flex
        flex-direction row
        justify-content space-between
        align-items flex-start
        padding .7rem .4rem
        border-bottom 1px solid #f1f1f1
        .shop_left
          margin-right .4rem
          flex 0 0 2.7rem
          .shop_img
            width: 2.7rem
            height: 2.7rem
            vertical-align middle
        .shop_right
          flex 1 1 auto
          .shop_detail_header
            display flex
            justify-content space-between
            align-items center
            height 1rem
            line-height 1rem
            .shop_title
              flex 0 0 8.5rem
              color #333
              padding-top .01rem
              font .65rem/.65ren 'PingFangSC-Regular'
              font-weight 700
            .premium ::before
              content: '\54C1\724C'
              display inline-block
              font-size .5rem
              line-height .6rem
              color #333
              background-color: #ffd930
              padding 0 0.1rem
              border-radius .1rem
              margin-right .2rem
            .shop_detail_ul
              padding-right .1rem
              flex 0 0 3.5rem
              text-align right
              .supports
                display inline-block
                margin-left 2px
                padding 0 2px
                font-size .5rem
                vertical-align middle
                text-align center
                color #999
                border 1px solid #f1f1f1
                transform scale(0.8)
          .rating_order_num
            display flex
            justify-content space-between
            align-items flex-start
            height 1rem
            line-height 1rem
            .rating_order_num_left
              display flex
              justify-content flex-start
              align-items flex-start
              .rating_section
                margin-right 8px
                .rating_num
                  margin 0 0.2rem
                  font-size .4rem
                  color #ff6000
              .order_section
                transform scale(0.8)
                margin-left -0.2rem
                font-size .4rem
                color #666
            .rating_order_num_right
              transform scale(0.7)
              .delivery_style
                font-size .5rem
                margin-left 0.08rem
                border-radius 0.08rem
              .delivery_left
                color #fff
                background-color: #3190e8
                border .025rem solid #3190e8
              .delivery_right
                color: #3190e8
                border .025rem solid #3190e8
          .fee_distance
            margin-top .52rem
            display flex
            justify-content space-between
            font-size .5rem
            color #333
            transform scale(0.9)
            .fee
            .distance_time
              .order_time
                color #3190e8
</style>
