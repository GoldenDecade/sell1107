import {getStyle } from '../../utils/mUtils'

export default loadMore = {
  directives: {
    'load-more': {
      bind(el, binding) {
        let windowHeight = window.screen.height,
          scrollEl,
          heightEl,
          setTop,
          height,
          paddingValue,
          marginValue,
          requestAF,
          oldScrollTop,
          scrollReduce = 2,
          scrollType = el.attributes.type && el.attributes.type.value
        if(scrollType == 1) {
          scrollEl = document.body
          heightEl = el
        }

        el.addEventListener('touchstart', (e) => { //初始化值
          setTop = el.offsetTop
          oldScrollTop = scrollEl.scrollTop
          height = heightEl.clientHeight
          marginValue = getStyle(heightEl, 'margin')
        }, false)

        el.addEventListener('touchmove', (e) => {
          _loadMore()
        }, false)

        el.addEventListener('touchend', (e) => {
          oldScrollTop = scrollEl.scrollTop
          _moveEnd()
        }, false)

        const _moveEnd = () => {
          requestAF= requestAnimationFrame(() => {
            if(scrollEl.scrollTop != oldScrollTop) {
              oldScrollTop = scrollEl.scrollTop
              requestAF()
            }else {
              cancelAnimationFrame(requestAF)
              height = heightEl.clientHeight
              _loadMore()
            }
          })
        }
        const _loadMore = () => {
          if(scrollEl.scrollTop + windowHeight >= setTop + height + marginValue + paddingValue - scrollReduce) {
            binding.value()
          }
        }

      }
    }
  }
}
