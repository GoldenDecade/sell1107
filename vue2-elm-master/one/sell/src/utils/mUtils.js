// 存储 localStorage
export const setStore = (name, content) => {
  if(!name){
    return
  }
  if(typeof content !== 'string'){
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

// 获取localStorage
export const getStore = (name) => {
  if(!name) return
  return window.localStorage.getItem(name)
}

// 删除localStorage
export const removeStorage = (name) => {
  if(!name) return
  window.localStorage.removeItem(name)
}

/*
* 获取style样式
* element 指的是元素
* attr 指的是属性
* NumberMode指的是数据类型，在获取opacity的时候需要获取小数会传入float，其他时候都是整型 int
* */
export const getStyle = (element, attr, NumberMode = 'int') => {
  let res
//  scrollTop 获取方式不同，因为它不属于style，属于DOM元素
  if(attr === 'scrollTop') {
    res = element.scrollTop
  }else if(element.currentStyle) { // IE获取元素的style
    res = element.currentStyle[attr]
  }else { // document.defaultView更加严谨，指的是当前document对象所关联的window对象，如果没有则返回null
    //一般使用window.getComputedStyle(元素, 伪类)[属性名]
    res = document.defaultView.getComputedStyle(element, null)[attr]
  }
//  在获取opacity的时候需要获取小数
  return NumberMode == 'float' ? parseFloat(res) : parseInt(res)
}

// 是否显示返回顶部按钮，开始，结束，运动三个过程中调用函数判断是否达到目标点
export const showBack = callback => {
  let requsetAF,
    oldScrollTop

  document.addEventListener('scroll', () => {
    isEnd()
  }, {passive: true})
  document.addEventListener('touchstart', () => {
    isEnd()
  }, {passive: true})
  document.addEventListener('touchmove', () => {
    isEnd()
  }, {passive: true})
  document.addEventListener('touchend', () => {
    oldScrollTop = document.body.scrollTop
    isStop()
  }, {passive: true})

  const isStop = () => {
    requsetAF = requestAnimationFrame(() => {
      if(oldScrollTop !== document.body.scrollTop) {
        oldScrollTop = document.body.scrollTop
        isStop()
      }else {
        cancelAnimationFrame(requsetAF)
      }
      isEnd()
    })
  }

//  判断是否到达终点
  const isEnd = () =>{
    if(document.body.scrollTop > 500){
      callback(true)
    }else {
      callback(false)
    }
  }
}
