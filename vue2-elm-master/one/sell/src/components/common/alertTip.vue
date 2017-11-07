<template>
  <div class="alert_container">
    <div class="tip_wrapper"></div>
    <section class="tip_text_container">
      <div class="tip_icon">
        <span></span>
        <span></span>
      </div>
      <p class="tip_text">{{alertText}}</p>
      <div class="confirm" @click="closeTip">确认</div>
    </section>
  </div>
</template>
<style rel="stylesheet" lang="stylus" >
  @import '../../style/index.styl'
  @keyframes tipMove {
    0% {transform: scale(1)}
    35% {transform: scale(.8)}
    70% {transform: scale(1.1)}
    100% {transform: scale(1)}
  }
  .alert_container
    position: fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 200
    .tip_wrapper
      width: 100%
      height: 100%
      background-color: rgba(0,0,0,0.1)
      -webkit-filter: blur(4px);
    .tip_text_container
      position: absolute
      top 50%
      left 50%
      width 12rem
      margin-top: -6rem
      padding 1rem 0
      transform translateX(-50%)
      background-color: rgba(255, 255, 255, 1)
      border: 1px solid #e4e4e4
      display flex
      flex-direction column
      justify-content center
      flex-wrap nowrap
      align-items center
      border-radius 6px
      .tip_icon
        width: 3rem
        height: 3rem
        border-radius: 50%
        border 3px solid #f8cb86
        span:nth-of-type(1)
          margin: .4rem auto 0
          display block
          width: .12rem
          height: 1.5rem
          background-color: #f8cb86
        span:nth-of-type(2)
          margin: .2rem auto 0
          display block
          width: .2rem
          height: .2rem
          border-radius 50%
          background-color: #f8cb86
      .tip_text
        width 80%
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        text-align center
        height 2rem
        line-height 2rem
        font-size .6rem
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
      .confirm
        width 80%
        height 1.5rem
        line-height 1.5rem
        border-radius: 6px
        color #fff
        text-align center
        font-size .9rem
        font-weight bold
        background-color: #4cd964

</style>
<script type="text/ecmascript-6">
  export default {
    props: {
      alertText: {
        type: String,
        default: ''
      }
    },
    data(){
      return {

      }
    },
    methods: {
      closeTip() {  //子组件向父组件传递信号
        this.$emit('closeTip')
      }
    }
  }
</script>
