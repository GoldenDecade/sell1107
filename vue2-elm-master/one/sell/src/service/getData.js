import fetch from '../utils/fetch'
import {getStore} from '../utils/mUtils'

// 获取用户信息
export const getUser = () => fetch('http://cangdu.org:8001/v1/user',
  {user_id: getStore('user_id')})

//获取首页默认地址
export const cityGuess = () => fetch('/api/v1/cities', {
  type: "guess"
})

//获取首页热门城市
export const hotCity = () => fetch('/api/v1/cities',{
  type: "hot"
})

//获取首页所有城市
export const groupCity = () => fetch('/api/v1/cities', {
  type: "group"
})

// 获取短信验证码
export const mobileCode = phone => fetch('/api/v4/mobile/verify_code/send', {
  mobile: phone,
  scene: 'login',
  type: 'sms'
}, 'POST')

//获取图片验证码
export const getcaptchas = () => fetch('/api/v1/captchas', {},'POST')

/**
 * 检测帐号是否存在
 */
export const checkExsis = (checkNumber, type) => fetch('/api/v1/users/exists', {
  [type]: checkNumber,
  type
});

/**
 * 手机号登录
 */
var sendLogin = (code, mobile, validate_token) => fetch('/api/v1/login/app_mobile', {
  code,
  mobile,
  validate_token
}, 'POST');

/**
 * 账号密码登录
 */
export const accountLogin = (username, password, captcha_code) => fetch('/api/v2/login',
  {username, password, captcha_code}, 'POST');
