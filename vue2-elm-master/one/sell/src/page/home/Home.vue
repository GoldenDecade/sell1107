<template>
  <div>
    <head-top signin-up="home">
      <span slot="logo" class="head_logo" @click="reload">ele.me</span>
    </head-top>
    <nav class="city_nav">
      <div class="city_tip">
        <span>当前定位城市：</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <router-link :to="'/city/' + guessCityid" class="guess_city border-bottom-1px border-top-1px">
        <span>{{guessCity}}</span>
        <span class="arrow_right">></span>
      </router-link>
    </nav>

    <section id="hot_city_container">
      <h4 class="city_title border-bottom-1px border-top-1px">热门城市</h4>
      <ul class="citylistul clear">
        <!--router-link tag这个属性-->
        <router-link tag="li" v-for="item in hotcity" :to="'/city/' + item.id" :key="item.id">
          {{item.name}}
        </router-link>
      </ul>
    </section>
    <section class="group_city_container">
      <ul class="letter_classify">
        <li v-for="(value, key, index) in sortgroupcity" :key="key" class="letter_classify_li">
          <h4 class="city_title">
            {{key}}
            <span v-if="index == 0">(按字母排序)</span>
          </h4>
          <ul class="groupcity_name_container citylistul clear">
            <router-link tag="li" v-for="item in value" :to="'/city/' + item.id" :key="item.id" class="ellipsis">{{item.name}}</router-link>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<style rel="stylesheet" lang="stylus">
  @import '../../style/index.styl'
  .city_nav
    padding 2.35rem 0 0 0
    .city_tip
      padding 0 10px
      height 32px
      line-height 32px
      display flex
      justify-content space-between
      span
        font-size 12px
    .guess_city
      padding 0 10px
      display flex
      justify-content space-between
      font-size 14px
      line-height 36px
      span
        color #3190e8
      .arrow_right
        width: 12px
        height: 12px
  #hot_city_container
    margin-top 8px
    .city_title
      text-indent 10px
      font-size 12px
      line-height 36px
    .citylistul
      li
        box-sizing border-box
        float left
        width 25%
        height: 35px
        font-size 12px
        line-height 35px
        text-align center
        color #3190e8
        border-right 1px solid #e4e4e4
        border-bottom 1px solid #e4e4e4

  .group_city_container
    .letter_classify
      .letter_classify_li
        .city_title
          font-size 14px
          line-height 32px
          text-indent 10px
          border-bottom 1px solid #e4e4e4
        .groupcity_name_container
          li
            float left
            box-sizing border-box
            width 25%
            height 35px
            line-height 35px
            font-size 12px
            text-align center
            border-left 1px solid #e4e4e4
            border-bottom 1px solid #e4e4e4
</style>

<script type="text/ecmascript-6">
  import headTop from '../../components/header/Header.vue'
  import {cityGuess, hotCity, groupCity} from '../../service/getData'
  export default {
    data(){
      return {
        guessCity: '', // 当前城市
        guessCityid: '',  // 当前城市 id
        hotcity: [], // 热门城市列表
        groupcity: {}  // 所有城市列表
      }
    },
    mounted(){
      // 获取当前城市
      cityGuess().then(res => {
        this.guessCity = res.name
        this.guessCityid = res.id
      })
      // 获取热门城市
      hotCity().then(res => {
        this.hotcity = res
      })
      //  获取所有城市
      groupCity().then(res => {
        this.groupcity = res
      })
    },
    components: {
      headTop
    },
    computed: {
      //将获取的数据按照A - Z字母开头排序
      sortgroupcity(){
        let sortobj = {}
        for (let i = 65; i <= 90; i++) {
          // String.fromCodePoint(num1,num2...)  更高阶的将Unicode转化为字符串
          if (this.groupcity[String.fromCharCode(i)]) { // fromCharCode(num1，num2...) 返回一个字符串
            sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)]
          }
        }
        return sortobj
      }
    },
    methods: {
      // 点击图标刷新页面
      reload(){
        window.location.reload()
      }
    }

  }
</script>
