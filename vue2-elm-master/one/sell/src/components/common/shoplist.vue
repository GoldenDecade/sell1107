<template>
  <div class="shoplist_container">
    <ul v-load-more="loaderMore"  type="1">
      <router-link :to="{path: 'shop', query: {geohash, id: item.id} }" v-for="item in shopListArr" tag="li" :key="item.id" class="shop_li">
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
        imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
      }
    },


  }
</script>
