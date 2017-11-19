<template>
  <div class="loading_container">
    <div class="load_img" :style="{backgroundPositionY: -(this.positionY % 7) * 2.5 + 'rem'}"></div>
    <svg class="load_ellipse" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <ellipse cx="26" cy="10" rx="26" ry="10" style="fill:#ddd;stroke:none;"></ellipse>
    </svg>
  </div>
</template>
<style rel="stylesheet" lang="stylus">
  @import "../../style/index.styl"
  @keyframes load {
    0% {transform: translateY(0)}
    50% {transform: translateY(-50px)}
    0% {transform: translateY(0)}
  }
  @keyframes ellipse {
    0% {transform: scale(1)}
    50% {transform: scale(0.3)}
    0% {transform: scale(1)}
  }
  .loading_container
    position: fixed
    left 50%
    top 50%
    transform translate(-50%, -50%)
    width: 2.5rem
    height: 2.5rem
    .load_img
      width: 100%
      height: 100%
      animation: load .6s infinite ease-in-out
      background-image: url('../../images/icon_loading.png')
      background-repeat no-repeat
      background-origin padding-box
      background-position 0 0
      background-size cover

    .load_ellipse
      position absolute
      width: 2.6rem
      height: 2rem
      top 2.2rem
      left 0
      z-index 10
      animation ellipse .6s infinite ease-in-out
</style>
<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        positionY: 0,
        timer: null
      }
    },
    mounted(){
      this.timer = setInterval(() => {
        this.positionY++
      }, 600)
    },
    beforeDestroy() {
      clearInterval(this.timer)
    }
  }
</script>
