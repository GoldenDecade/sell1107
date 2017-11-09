<template>
  <div class="loginContainer">
    <head-top :head-title="loginWay? '手机号登录':'密码登录'" goBack="true"></head-top>
    <!--<el-form   :model="loginfrom1" status-icon :rules="loginfrom1_rules" ref="loginfrom1"
             label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="username">
        <el-input type="text" v-model="loginfrom1.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="loginfrom1.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model.number="loginfrom1.code"></el-input>
      </el-form-item>
    </el-form>-->
    <form v-if="loginWay" class="form_wrapper">
      <section class="input_container phone_number">
        <input type="text" placeholder="請輸入手機號碼" name="phone" maxlength="11" v-model="phoneNumber">
        <button @click.prevent="getVerifyCode" :class="{right_phone_number: rightPhoneNumber}" v-show="!computedTime">获取验证码</button>
        <button @click.prevent="" v-show="computedTime">已发送{{computedTime}}s</button>
      </section>
      <section class="input_container">
        <input type="text" placeholder="验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
      </section>
    </form>
    <form v-else="!loginWay" class="form_wrapper">
      <section class="input_container">
        <!--默认情况下，v-model在input事件中同步输入框的值与数据，使用修饰符lazy，从而转变为在change事件中同步-->
        <input type="text" placeholder="账号" v-model.lazy="userAccount">
      </section>
      <section>
        <!--显示密码 与  不显示密码-->
        <input v-if="!showPassword" type="password" placeholder="密码" v-model="passWord">
        <input v-else type="text" placeholder="密码" v-model="passWord">
        <!--是否显示密码的按钮-->
        <div class="button_switch" :class="{change_to_text: showPassword}">
          <div class="circle_button" :class="{trans_to_right: showPassword}"
               @click="changePassWordType"></div>
          <span class="on">ON</span>
          <span class="off">OFF</span>
        </div>
      </section>
      <section class="input_container captcha_code_container">
        <!--<input v-show="captchaCodeImg" :src="captchaCodeImg" placeholder="验证码">-->
        <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
        <div class="img_change_img">
          <img  ref="captchaCode" v-show="captchaCodeImg">
          <div class="change_img" @click="getCaptchaCode">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </section>
    </form>

    <p class="login_tips">温馨提示：未注册过的账号，登录时将自动注册</p>
    <p class="login_tips">注册过的用户可凭账号密码登录</p>
    <div class="login_container" @click="mobileLogin">登录</div>
    <router-link to="/forget" class="to_forget" v-if="!loginWay">重置密码 ?</router-link>
    <alert-tip v-if="showAlert" :showHide="showAlert"
    @closeTip="closeTip" :alertText="alertText"></alert-tip>
  </div>
</template>
<style rel="stylesheet" lang="stylus">
  @import "../../style/index.styl"
  .loginContainer
    width: 100%
    font-size .6rem
    padding-top 1.95rem
    form
      padding-top .5rem
      width 100%
      background-color: #fff
      section
        position relative
        box-sizing border-box
        width: 100%
        padding-left .5rem
        height 1.5rem
        line-height 1.5rem
        border-top: 1px solid #e4e4e4
        &:last-child
          border-bottom: 1px solid #e4e4e4
        input
          font-size: .6rem
          width 60%
          height 100%
        &:nth-of-type(2)
          .button_switch
            font-size 0
            width: 2.5rem
            height: 1rem
            background-color: #e4e4e4
            border-radius .5rem
            position absolute
            right 1rem
            top .35rem
            transition: all .5s
            .on
              visibility hidden
              display: inline-block
              box-sizing border-box
              padding-left .1rem
              width: 50%
              height: 1rem
              line-height 1rem
              text-align left
              font-size .6rem
              color: #fff
            .off
              visibility visible
              display: inline-block
              box-sizing border-box
              padding-right .1rem
              width: 50%
              height: 1rem
              line-height 1rem
              text-align right
              font-size .6rem
              color: #fff
            &.change_to_text
              background-color: #4cd964
              .on
                visibility visible
              .off
                visibility hidden
            .circle_button
              position absolute
              top .1rem
              left .1rem
              width: .8rem
              height: .8rem
              border-radius 50%
              background-color: #f1f1f1
              transition: all .5s
              &.trans_to_right
                left: 1.6rem
                background-color: #fff

        &:nth-of-type(3)
          height 2rem
          .img_change_img
            position absolute
            top 0
            right 0
            width 30%
            height 100%
            img
              float left
              width: 50%
              height: 100%
              vertical-align middle
            .change_img
              float right
              width: 50%
              height: 100%
              vertical-align middle
              p
                height 1rem
                line-height 1rem
                font-size: .6rem
                text-align: center

      .phone_number
        button
          box-sizing border-box
          position absolute
          top 50%
          right 1rem
          width: 5rem
          height 1.2rem
          line-height 1.2rem
          border-radius .2rem
          transform translateY(-50%)
          background-color: #e4e4e4
          color #fff
          text-align center
          &.right_phone_number
            background-color: #6be457
    p.login_tips
      line-height 1.2rem
      color red
    .login_container
      margin 0.5rem auto
      width: 85%
      height 1.5rem
      line-height 1.5rem
      text-align center
      background-color: #4cd964
      border-radius: .3rem
      color #fff
    .to_forget
      display block
      margin 0 auto
      width 85%
      text-align right
      color red
</style>
<script type="text/ecmascript-6">
  import Header from 'components/header/Header'
  import alertTip from 'components/common/alertTip'
  // import {localapi, proapi, imgBaseUrl} from 'src/config/env'
  import {mapState, mapMutations} from 'vuex'
  import {mobileCode, checkExsis, sendLogin, getcaptchas, accountLogin} from '../../service/getData'
  export default {
    props: [],
    data() {
      /*var validateUsername = (rule, value, callback) => {
       if(!value){
       return callback(new Error('用户名不能为空'))
       }
       if(!/^[A-Za-z0-9]{8, 12}$/.test(value)){
       return callback(new Error('用户名由8到12位的数字、字母构成'))
       } else {
       callback()
       }
       };
       var validatePass = (rule, value, callback) => {
       if (!value) {
       return callback(new Error('密码不能为空'));
       }
       if(!/^[A-Za-z0-9]{8, 12}$/.test(value)){
       return callback(new Error('用户名由8到12位的数字、字母构成'))
       } else {
       callback()
       }
       };
       var validateCode = (rule, value, callback) => {
       if (value === '') {
       callback(new Error('请再次输入验证码'));
       }
       callback()
       };
       return {
       loginfrom1: {
       username: '',
       pass: '',
       code: ''
       },
       loginfrom1_rules: {
       username: [
       { validator: validateUsername, trigger: 'blur' }
       ],
       pass: [
       { validator: validatePass, trigger: 'blur' }
       ],
       code: [
       { validator: validateCode, trigger: 'blur' }
       ]
       },
       loginWay: false
       }*/
      return {
        loginWay: false,
        showPassword: false,
        userAccount: null,
        passWord: null,
        codeNumber: null,
        captchaCodeImg: false, // 验证码地址是否存在
        showAlert: false,
        alertText: null,
        userInfo: null, // 获取到的用户信息
        phoneNumber: null,
        computedTime: false,
        mobileCode: null,
        validate_token: null, // 获取手机验证码
      }
    },
    // 实例刚被创建，还未挂载时
    created(){
      // 获取验证码
      this.getCaptchaCode()

    },
    computed: {
      // 实时判断手机号码
      rightPhoneNumber() {
        return /^1\d{10}$/gi.test(this.phoneNumber)
      }
    },
    methods: {
      // this.RECORD_USERINFO() 映射为  this.$store.commit('RECORD_USERINFO')
      // this.RECORD_USERINFO(param) 映射为  this.$store.commit('RECORD_USERINFO', param)
      ...mapMutations(['RECORD_USERINFO'
      ]),
      // 获取手机验证码
      async getVerifyCode() {
        if(this.rightPhoneNumber){
          this.computedTime = 30
          this.timer = setInterval(() => {
            this.computedTime--
            if(this.computedTime === 0){
              clearInterval(this.timer)
            }
          }, 1000)
          // 判断用户是否存在
          let exsis = await checkExsis(this.phoneNumber, 'mobile')
          if(exsis.message){
            this.showAlert = true
            this.alertText = exsis.message
            return
          }else if(!exsis.is_exists) {
            this.showAlert = true
            this.alertText = '您输入的手机号尚未绑定'
            return
          }
          // 发送短信验证码
          let res = await mobileCode(this.phoneNumber)
          if(res.message){
            this.showAlert = true
            this.alertText = res.message
            return
          }
//          存储验证码
          this.validate_token = res.validate_token
        }
      },
      // 获取验证码
      /*async 表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果
       async 函数返回一个Promise对象，可以使用then方法添加回调函数。
       当函数执行的时候，一旦遇到await就会先返回。等到触发的异步操作完成，再接着执行函数体内后面的语句*/
      async getCaptchaCode(){
        console.log('get')
        if(this.loginWay){
          return
        }
        let res;
        res = await getcaptchas()
        this.$refs.captchaCode.src = res.code
        this.captchaCodeImg = true
      },
      changePassWordType() {
        this.showPassword = !this.showPassword
      },
      async mobileLogin() {
        if(this.loginWay){
          if(!this.rightPhoneNumber) {
            this.showAlert = true
            this.alertText = '手机号码不正确'
            return
          }else if(!/^\d{6}$/gi.test(this.mobileCode)) {
            this.showAlert = true
            this.alertText = '短信验证码不正确'
            return
          }
//          手机号登录
          this.userInfo = await sendLogin(this.mobileCode, this.right_phone_number, this.validate_token)
        }else {
          if(!this.userAccount){
            this.showAlert = true
            this.alertText = '请输入手机号/邮箱/用户名'
            return
          }else if(!this.passWord){
            this.showAlert = true
            this.alertText = '请输入密码'
            return
          }else if(!this.codeNumber){
            this.showAlert = true
            this.alertText = '请输入验证码'
            return
          }
        //开始登录，发送登录请求  this.userInfo为返回的信息
          this.userInfo = await accountLogin(this.userAccount, this.passWord, this.codeNumber)
          //返回的信息结构
          // {"__v":0,"username":"qwe13244","user_id":8541,"id":8541,"city":"北京",
          // "registe_time":"2017-11-07 13:56","_id":"5a014afaa5ab34346ccf6916","
          // column_desc":{"gift_mall_desc":"0元好物在这里",
          // "game_link":"https://gamecenter.faas.ele.me","game_is_show":1,
          // "game_image_hash":"05f108ca4e0c543488799f0c7c708cb1jpeg","game_desc":"玩游戏领红包"},
          // "point":0,"mobile":"","is_mobile_valid":true,"is_email_valid":false,"is_active":1,
          // "gift_amount":3,"email":"","delivery_card_expire_days":0,"current_invoice_id":0,"
          // current_address_id":0,"brand_member_new":0,"balance":0,"avatar":"default.jpg"}
        }
      //  如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
        if(!this.userInfo.user_id){
          this.showAlert = true
          this.alertText = this.userInfo.message
          if(!this.loginWay){ //如果使用用户名登录，那么重新获取验证码
            this.getCaptchaCode()
          }
        }else {
          //记录用户信息，然后返回上一页
          this.RECORD_USERINFO(this.userInfo)
          this.$router.go(-1)
        }
      },
      closeTip(){ // 父子组件事件交互
        this.showAlert = false
      }
    },
    components: {
      'headTop': Header,
      alertTip
    }
  }



</script>
