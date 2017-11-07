<template>
    <header id="head_top">
      <slot name="logo"></slot>
      <slot name="search"></slot>
      <!--goback 按钮 start （定位城市的时候不显示）-->
      <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </section>
      <!--goback 按钮 end-->

      <router-link :to="userInfo? '/profile':'/login'" v-if='signinUp' class="head_login">
        <span class="user_avatar" v-if="userInfo">
          user
        </span>
        <span class="login_span" v-else>登录|注册</span>
      </router-link>

      <section class="title_head ellipsis" v-if="headTitle">
        <span class="title_text">{{headTitle}}</span>
      </section>
      <slot name="edit"></slot>
      <slot name="msite-title"></slot>
      <slot name="changecity"></slot>
      <slot name="changeLogin"></slot>
    </header>
</template>
<style lang="stylus" rel="stylesheet/stylus" >
  @import "../../style/mixin.styl"
  #head_top
    wh(100%, 1.95rem)
    position fixed
    left 0
    top 0
    z-index 100
    background-color color_blue
    .head_logo
      margin-left .55rem
      line-height 1.95rem
    .head_goback
      margin .65rem 0 0 .4rem
      wh(.6rem, 1rem)
    .head_login
      right 0
      margin-right .55rem
      sc(0.65rem, #fff)
      ct()
      .user_avatar
        fill #fff
        wh(1rem, 1rem)
      .login_span
        color #fff
    .title_head
      center()
      width: 50%
      color #fff
      text-align center
      .title_text
        sc(.8rem, #fff)
        text-align center
        font-weight bold

</style>
<script type="text/ecmascript-6">
  import {mapState, mapActions} from 'vuex'
  export default {
    props: ['signinUp', 'headTitle', 'goBack'],
    data(){
      return {

      }
    },
    mounted(){
      // 获取用户信息
      this.getUserInfo()
    },
    computed: {
      /*...mapState([  使用mapState辅助函数  使用对象展开运算符将此对象混入到外部对象中
        'userInfo'
      ])*/
      userInfo(){
        return this.$store.state.userInfo
      }
    },
    methods: {
      /*getUserInfo(){
        // this.$store.commit('GET_USERINFO')
        this.$store.dispatch('getUserInfo')
      }*/
      ...mapActions([
        'getUserInfo'
      ])
    }
  }
</script>
