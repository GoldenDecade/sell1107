import {
  RECORD_ADDRESS,
  RECORD_USERINFO,
  GET_USERINFO
} from './mutation-types'

import {setStore, getStore} from '../utils/mUtils.js'

export default {
  // 记录当前经纬度
  [RECORD_ADDRESS](state, {latitude, longitude}){
    state.latitude = latitude
    state.longitude = longitude
  },
  // 记录用户信息
  [RECORD_USERINFO](state, info){
    state.userInfo = info
    state.login = true
    setStore('user_id', info.user_id)
  },
  // 获取用户信息存入vuex
  [GET_USERINFO](state, info){
    if(state.userInfo && (state.userInfo.username !== info.username)){
      return;
    }
    if(!state.login){
      return;
    }
  }
}
