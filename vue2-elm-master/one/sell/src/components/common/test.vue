<template>

  <div>
    <input v-wq:min.a.b="hello" type="text" v-model="min" />
    <button @click="add">add</button>
  </div>
</template>
<style rel="stylesheet">

</style>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        min: 10
      }
    },
    directives: {
      wq: {
        bind(el, binding, vnode) {
          console.log(binding.name)
          el.addEventListener('focus', function () {
            console.log('focus')
            binding.value(binding.arg)
          })
        },
        inserted(el, binding, vnode) {
          console.log(vnode);
          console.log('inserted')
        },
        update(el, binding, vnode, oldVnode) {
          console.log('update');
          console.log(binding.arg);
          console.log(vnode);
          console.log(oldVnode);
        },
        componentUpdated(el, binding, vnode, oldVnode){

        },
        unbind(el, binding, vnode){

        }
      }
    },
    methods: {
      hello(a) {
        console.log('hello')
      },
      add() {
        this.min++
      }
    }
  }
</script>

