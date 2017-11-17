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

/*
* 运动效果  animate  适用于opacity、 width left fontSize等数值型的属性
* {htmlElement}  el            运动对象
* {JSON}         target        属性的目标值
* {number}       duration      运动时间，默认400ms
* {string}       mode          运动模式，默认 ease-out
* {function}     callback      链式动画，回调函数
* */
export const animate = (el, target, duration = 400, mode = 'ease-out', callback) => {
  clearInterval(el.timer)

  //获取el的样式
  const attrStyle = attr => {
    if(attr === 'opacity'){
      return Math.round(getStyle(el, attr, 'float') * 100)
    }else {
      return getStyle(el, attr)
    }
  }
//  根字体大小，需要从rem改成px进行运算
  const rootSize = parseFloat(document.documentElement.style.fontSize)
  const unit = {}, initState = {}
  //获取目标属性单位和初始样式值
  Object.keys(target).forEach(attr => {
    if(/[^\d^\.]+/gi.test(target[attr])){
      unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || 'px'
    }else {
      unit[attr] = 'px'
    }
    initState[attr] = attrStyle(attr)   // 元素各个属性的初始值
  })
//  去掉传入的后缀单位
  Object.keys(target).forEach(attr => {
    if(unit[attr] == 'rem'){
      target[attr] = Math.ceil(rootSize * parseFloat(target[attr]))
    }else {
      target[attr] = parseFloat(target[attr])
    }
  })
  let flag = true  // 假设所有运动到达终点了
  const remberSpeed = {} //记录上一个速度值，在ease-in模式下需要用到
  el.timer = setInterval(() => {
    Object.keys(target).forEach(attr => {
      let iSpeed = 0, // 步长  速度
        status = false, // 是否仍需运动
        iCurrent = attrStyle(attr) || 0, // 当前属性值
        speedBase = 0, // 每次运动之前的值
        intervalTime; // 将目标值分为多少步执行，数值越大，步长越小
      switch(mode) {
        case 'case-out': // 先快后慢
          speedBase = iCurrent  //
          intervalTime = duration * 5 / 400
          break;
        case 'ease-in': // 先慢后快
          let oldspeed = remberSpeed[attr] || 0;
          iSpeed = oldspeed + (target[attr] - initState[attr]) / duration
          remberSpeed[attr] = iSpeed
          break;
        case 'linear':
          speedBase = initState[attr] || 0
          intervalTime = duration * 20 / 400
          break;
        default:
          speedBase = iCurrent
          intervalTime = duration * 5 / 400
      }
      if(mode !== 'ease-in'){
        iSpeed = (target[attr] - speedBase) / intervalTime
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed)
      }
    //  判断是否小于iSpeed，从而判断是否达到终点
      status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
      if(status){
        flag = false
        // scrollTop 与 opacity 要特别处理
        if(attr === 'scrollTop'){
          el.scrollTop = iCurrent + iSpeed
        }else if(attr === 'opacity') {
          el.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")"
          el.style.opacity = (iCurrent + iSpeed) / 100
        }else {
          el.style[attr] = (iCurrent + iSpeed) + 'px'
        }
      }else {
        if(attr === 'scrollTop'){
          el.scrollTop = target[attr]
        }else if(attr === 'opacity') {
          el.style.filter = "alpha(opacity:" + target[attr] * 100  + ")"
          el.style.opacity = target[attr]
        }else {
          el.style[attr] = target[attr]
        }
        flag = true

      }

    })
    if(flag){
      clearInterval(el.timer)
      if(callback){
        callback()
      }
    }
  }, 20)


}
