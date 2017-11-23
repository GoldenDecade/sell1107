<template>
  <div class="profile_page">
    <head-top go-back="true" :head-title="profiletitle"></head-top>
    <section class="profile_wrapper">
      <section class="profile-number">
        <router-link :to="userInfo && userInfo.user_id? '/profile/info' : '/login'" class="profile-link">
          <img v-if="userInfo && userInfo.user_id" :src="imgBaseUrl + userInfo.avatar" class="privateImage" />
          <span class="privateImage" v-else>
            <svg class="privateImage-svg">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
                        </svg>
          </span>
          <div class="user-info">
            <p>{{username}}</p>
            <p>
              <span class="user-icon">
                <svg class="icon-mobile" fill="#fff">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
                                </svg>
              </span>
              <span class="icon-mobile-number">{{mobile}}</span>
            </p>
          </div>
          <span class="arrow">
            <svg class="arrow-svg" fill="#fff">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
          </span>
        </router-link>
      </section>
      <section class="info-data">
        <ul class="clear">
          <router-link to="/balance" tag="li" class="info-data-link">
            <span class="info-data-top"><b>{{parseInt(balance).toFixed(3)}}</b>元</span>
            <span class="info-data-bottom">我的余额</span>
          </router-link>
          <router-link to="/benefit" tag="li" class="info-data-link">
            <span class="info-data-top"><b>{{count}}</b></span>
            <span class="info-data-bottom">我的优惠</span>
          </router-link>
          <router-link to="/points" tag="li" class="info-data-link">
            <span class="info-data-top"><b>{{pointNumber}}</b></span>
            <span class="info-data-bottom">我的积分</span>
          </router-link>
        </ul>
      </section>
      <section class="profile-lreTe">
        <router-link to="/order" class="myorder">
          <aside>
            <svg fill="#4aa5f0">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
            </svg>
          </aside>
          <div class="myorder-div">
            <span>我的订单</span>
            <span class="myorder-divsvg">
              <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
            </span>
          </div>
        </router-link>
        <a href="https://home.m.duiba.com.cn/#/chome/index" class="myorder">
          <aside>
            <svg fill="#fc7b53">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
            </svg>
          </aside>
          <div class="myorder-div">
            <span>积分商城</span>
            <span class="myorder-divsvg">
              <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
            </span>
          </div>
        </a>
        <router-link to="/vipcard" class="myorder">
          <aside>
            <svg fill="#ffc636">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#vip"></use>
            </svg>
          </aside>
          <div class="myorder-div">
            <span>饿了么会员卡</span>
            <span class="myorder-divsvg">
              <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
            </span>
          </div>
        </router-link>
      </section>
      <section class="profile-lreTe">
      <!--服务中心-->
        <router-link to="/service" class="myorder">
          <aside>
            <svg fill="#4aa5f0">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#service"></use>
            </svg>
          </aside>
          <div class="myorder-div">
            <span>服务中心</span>
            <span class="myorder-divsvg">
              <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
            </span>
          </div>
        </router-link>
        <router-link to="/download" class="myorder">
          <aside>
            <svg fill="#3cabff">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use>
            </svg>
          </aside>
          <div class="myoder-div" style="border-bottom: 0;">
            <span>下载饿了么APP</span>
            <span class="myorder-divsvg">
              <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
            </span>
          </div>
        </router-link>
      </section>
    </section>
    <foot-guide></foot-guide>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<style rel="stylesheet" lang="stylus">
  @import "../../style/index.styl"
  .profile_wrapper
    .profile-number
      padding-top 1.95rem
      .profile-link
        display:flex;
        box-align: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background: #3190e8
        padding: .666667rem .6rem;
        .privateImage
          display:inline-block;
          wh(2.5rem,2.5rem);
          border-radius:50%;
          vertical-align:middle;
          .privateImage-svg
            background: #FFF;
            border-radius:50%;
            wh(2.5rem,2.5rem);
        .user-info
          margin-left:.48rem;
          -webkit-box-flex: 1;
          -ms-flex-positive: 1;
          flex-grow: 1;
          p
            sc(.8rem,fc)
            font-weight 700
            .user-icon
              wh(0.5rem,0.75rem);
              display:inline-block;
              vertical-align:middle;
              line-height:0.75rem;
              .icon-mobile
                wh(100%,100%)
            .icon-mobile-number
              display:inline-block
              sc(.57333rem,fc)
        .arrow
          wh(.46667rem,.98rem)
          display:inline-block
          .arrow-svg
            wh(100%,100%)
    .info-data
      width:100%;
      background: fc;
      box-sizing: border-box;
      .info-data-link
        float:left;
        width:33.33%;
        display:inline-block;
        border-right:1px solid #f1f1f1;
        span
          display:block;
          width:100%;
          text-align:center;
        .info-data-top
          sc(.55rem,#333)
          padding: .853333rem 0 .453333rem
          b
            display:inline-block;
            sc(1.2rem,#f90);
            font-weight:700;
            line-height:1rem;
            font-family: Helvetica Neue,Tahoma
        .info-data-bottom
          sc(.57333rem,#666);
          font-weight:400;
          padding-bottom:.453333rem;

      &:nth-type-of(2)
        .info-data-top
          b
            color #ff5f3e
      &:nth-type-of(3)
        border none
        .info-data-top
          b
            color:#6ac20b
    .profile-lreTe
      margin-top: .4rem;
      background: fc;
      .myorder
        padding-left:1.6rem;
        display:flex;
        align-items: center;
        aside
          wh(.7rem,.7rem);
          margin-left:-.866667rem;
          margin-right:.266667rem;
          display:flex;
          align-items: center;
          svg
            wh(100%,100%);
        .myorder-div
          width:100%;
          border-bottom:1px solid #f1f1f1;
          padding:.433333rem .266667rem .433333rem 0;
          sc(.7rem,#333);
          display:flex;
          justify-content:space-between;
          span
            display:block;
            &.myorder-divsvg
              wh(.46667rem,.466667rem);
              svg
                wh(100%,100%)
  .router-slid-enter-active, .router-slid-leave-active
    transition: all .4s
  .router-slid-enter-active, .router-slid-leave-active
    transform translate3d(2rem, 0, 0)
    opacity 0
</style>
<script type="text/ecmascript-6">
  import headTop from 'components/header/Header.vue'
  import footGuide from 'components/footer/footGuide.vue'
  import {mapState, mapMutation} from 'vuex'
  import {getImgPath} from 'src/components/common/mixin'
  export default {
    data() {
      return {
        imgBaseUrl: 'https://fuss10.elemecdn.com/', //图片域名地址
        profiletitle: '我的',
        avatar: '', // 头像地址
        username: '登录/注册',
        resername: '',
        mobile: '暂无绑定手机号',
        balance: 0, // 余额
        count: 0, // 优惠券个数
        pointNumber: 0,  //  积分数
      }
    },
    mounted() {
      this.initData()
    },
    mixins: [getImgPath],
    computed: { // 计算属性是基于他们的依赖进行缓存的，在相关依赖发生改变时才会重新求值，只要依赖没有发生改变，多次访问计算属性都会立即返回之前的计算结果，而不必再次执行函数
      ...mapState([
        'userInfo'
      ])
    },
    methods: {
      initData(){
        if(this.userInfo && this.uerInfo.user_id) {
          this.avatar = this.userInfo.avatar
          this.username = this.userInfo.username
          this.mobile = this.userInfo.mobile || '暂无绑定手机号'
          this.balance = this.userInfo.balance
          this.count = this.userInfo.gift_amount
          this.pointNumber = this.userInfo.point
        }else {
          this.username = '登录/注册'
          this.mobile = '暂无绑定手机号'
        }
      }
    },
    watch: { // watch 响应数据的变化，当需要在数据变化时执行异步或开销较大的操作时，比computed好
      userInfo: function(value){
        this.initData()
      }
    },
    components: {
      headTop,
      footGuide
    }
  }
</script>
