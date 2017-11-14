import {getStyle } from '../../utils/mUtils'

export default loadMore = {
  directives: {
    'load-more': {
      //一个指令定义对象可以提供如下钩子函数
      //函数参数如下
      bind: (el, binding, vnode, oldVnode) => {
        let windowHeight = window.screen.height,
          height,
          setTop,
          paddingBottom,
          marginBottom,
          requestFram,
          oldScrollTop,
          scrollEl,
          heightEl,
          scrollType = el.attributes.type && el.attributes.type.value,
          scrollReduce = 2;
        if(scrollType == 2) {
          scrollEl = el
          heightEl = el.children[0]
        } else {
          scrollEl = document.body
          heightEl = el
        }
        el.addEventListener('touchstart', () => {
          height = heightEl.clientHeight
          if(scrollType == 2) {
            height = height
          }
          setTop = el.offsetTop
          paddingBottom = getStyle(el, 'paddingBottom')
          marginBottom = getStyle(el, 'marginBottom')
        }, false)
        el.addEventListener('touchmove', () => {
          loadMore()
        }, false)
        el.addEventListener('touchend', () => {
          oldScrollTop = scrollEl.scrollTop
          moveEnd()
        }, false)

        const moveEnd = () => {
          requestFram = requestAnimationFrame(() => {
            if(scrollEl.scrollTop != oldScrollTop){
              oldScrollTop = scrollEl.scrollTop
              moveEnd()
            } else {
              cancelAnimationFrame(requestFram)
              height = heightEl.clientHeight
              loadMore()
            }
          })
        }

        const loadMore = () => {
          if(scrollEl.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom - scrollReduce) {
            binding.value()
          }
        }

      }
    }
  }
}
