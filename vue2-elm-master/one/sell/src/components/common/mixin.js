import {getStyle } from '../../utils/mUtils'

export const loadMore_directive = {
  directives: {
    'load-more': {
      bind(el, binding) {
        let windowHeight = window.screen.height,
          scrollEl,
          heightEl,
          setTop,
          height,
          paddingBottom,
          marginTop,
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
          marginTop = getStyle(heightEl, 'margin-top')
          paddingBottom = getStyle(heightEl, 'padding-bottom')
        }, false)

        el.addEventListener('touchmove', (e) => {
          _loadMore()
        }, false)

        el.addEventListener('touchend', (e) => {
          oldScrollTop = scrollEl.scrollTop
          _moveEnd()
        }, false)

        const _moveEnd = () => {
          requestAF = requestAnimationFrame(() => {
              if(scrollEl.scrollTop != oldScrollTop) {
                oldScrollTop = scrollEl.scrollTop
                _moveEnd()
              }else {
                cancelAnimationFrame(requestAF)
                height = heightEl.clientHeight
                _loadMore()
              }
            })
        }
        const _loadMore = () => {
          if(scrollEl.scrollTop + windowHeight >= setTop + height + marginTop + paddingBottom - scrollReduce) {
            binding.value()
          }
        }

      }
    }
  }
}
