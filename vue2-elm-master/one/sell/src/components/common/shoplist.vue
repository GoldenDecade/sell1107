<template>
  <div class="shoplist_container">
    <ul v-load-more="loaderMore"  type="1">
      <router-link :to="{path: 'shop', query: {geohash, id: item.id} }" v-for="item in shopListArr" tag="li"
                   :key="item.id" class="shop_li">
        <section>
          <img :src="imgBaseUrl + item.image_path" class="shop_img">
        </section>

      </router-link>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import {loadMore } from './mixin'

  export default {
    data() {
      return {
        shopListArr: [], //店铺列表数据
        shopIsEnd: false, //商品是否已经没有了  如果请求的商品数量小于everyReqShop，则表明已经没有更多商品了
        offset: 0, //批次加载店铺列表，每次请求商品列表的时候需要的参数，就像分页时候的数据位置一样
        limit: 20, //约定每次加载20个
        imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
      }
    },
    methods: {
      async initData (){

      },
      async loaderMore() {
        console.log('loaderMore');
      }
    },
//    mixins 的作用就是讲引入的组件、指令等混合到当前代码，如果引入的是组件，在相同的生命周期中有相同的函数则以当前组件的为准，否则都执行
    mixins: [loadMore]


  }
</script>
