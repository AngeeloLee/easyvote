<template>
  <div class="login">
    <h2>{{$t('login.title')}}</h2>
    <!-- <a-divider /> -->
    <div class="choices">
      <a :active="tab!=='register'" @click="tab='pwd-login'">{{$t('login.login')}}</a>/
      <a :active="tab==='register'" @click="tab='register'">{{$t('login.register')}}</a>
    </div>
    <!-- 密码登录 --> 
    <form v-if="tab==='pwd-login'" class="pwd-login">
      <p class="label">{{$t('login.account')}}</p>
      <a-input :placeholder="$t('login.accountHolder')" @change="e=>account=e.target.value"/>
      <p class="label">{{$t('login.password')}}</p>
      <a-input-password :placeholder="$t('login.passwordHolder')" @change="e=>password=e.target.value"/>
      <a-button class="action" type="primary" @click="login('pwd-login')" block>{{$t('login.loginButton')}}</a-button>
      <a-row>
        <a-col :span="14">
          <span class="left"><a @click="tab='sms-login'">{{$t('login.smsLogin')}}</a></span><br>
          <span class="left"><a @click="tab='email-login'">{{$t('login.emailLogin')}}</a></span>
        </a-col>
        <a-col :span="10">
          <span class="right"><a-checkbox @change="e=>rememberMe=e.target.checked">{{$t('login.rememberMe')}}</a-checkbox></span>
        </a-col>
      </a-row>
    </form>
    <!-- 短信验证码登录 -->
    <form v-else-if="tab==='sms-login'" class="sms-login">
      <p class="label">{{$t('login.mobile')}}</p>
      <a-row>
        <a-col :span="10">
          <a-select :default-value="country" @change="val=>country=val">
            <a-select-option v-for="ctr in fullCountriesCode" :value="ctr.code" :key="ctr.code">
              {{'+'+ctr.code+' '+ctr.name+' '+ctr.chinese_name}}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="14">
          <a-input :placeholder="$t('login.mobileHolder')" @change="e=>mobile=e.target.value"/>
        </a-col>
      </a-row>
      <p class="label">{{$t('login.code')}}</p>
      <a-row>
        <a-col :span="18">
          <a-input :placeholder="$t('login.codeHolder')"  @change="e=>code=e.target.value"/>
        </a-col>
        <a-col :span="6">
          <a-button v-if="!timer" type="primary" @click="getCode('mobile')" block>{{$t('login.getCodeButton')}}</a-button>
          <a-button v-else type="primary" disabled block>{{timeCount}}s</a-button>
        </a-col>
      </a-row>
      <a-button class="action" type="primary" @click="login('sms-login')" block>{{$t('login.loginButton')}}</a-button>
      <a-row>
        <a-col :span="14">
          <span class="left"><a @click="tab='pwd-login'">{{$t('login.passwordLogin')}}</a></span><br>
          <span class="left"><a @click="tab='email-login'">{{$t('login.emailLogin')}}</a></span>
        </a-col>
        <a-col :span="10">
          <span class="right"><a-checkbox @change="e=>rememberMe=e.target.checked">{{$t('login.rememberMe')}}</a-checkbox></span>
        </a-col>
      </a-row>
    </form>
    <!-- 邮件验证码登录 -->
    <form v-else-if="tab==='email-login'" class="email-login">
      <p class="label">{{$t('login.email')}}</p>
      <a-input :placeholder="$t('login.emailHolder')" @change="e=>email=e.target.value"/>
      <p class="label">{{$t('login.code')}}</p>
      <a-row>
        <a-col :span="18">
          <a-input :placeholder="$t('login.codeHolder')" @change="e=>code=e.target.value"/>
        </a-col>
        <a-col :span="6">
          <a-button v-if="!timer" type="primary" @click="getCode('email')" block>{{$t('login.getCodeButton')}}</a-button>
          <a-button v-else type="primary" disabled block>{{timeCount}}s</a-button>
        </a-col>
      </a-row>
      <a-button class="action" type="primary" @click="login('email-login')" block>{{$t('login.loginButton')}}</a-button>
      <a-row>
        <a-col :span="14">
          <span class="left"><a @click="tab='pwd-login'">{{$t('login.passwordLogin')}}</a></span><br>
          <span class="left"><a @click="tab='sms-login'">{{$t('login.smsLogin')}}</a></span>
        </a-col>
        <a-col :span="10">
          <span class="right"><a-checkbox @change="e=>rememberMe=e.target.checked">{{$t('login.rememberMe')}}</a-checkbox></span>
        </a-col>
      </a-row>
    </form>
    <!-- 注册 -->
    <form v-else-if="tab==='register'" class="email-login">
      <a-row>
        <a-col :span="14">
          <p class="label">{{$t('login.registerWay')}}</p>
          <a-radio-group @change="e=>registerWay=e.target.value">
            <a-radio-button value="mobile">{{$t('login.useMobile')}}</a-radio-button>
            <a-radio-button value="email">{{$t('login.useEmail')}}</a-radio-button>
          </a-radio-group>
        </a-col>
        <a-col :span="10">
          <p class="label">{{$t('login.createAddress')}}</p>
          <a-switch default-checked @change="checked=>createAddress=checked" />
        </a-col>
      </a-row>
      <div v-if="registerWay==='mobile'">
        <p class="label">{{$t('login.mobile')}}</p>
        <a-row>
          <a-col :span="10">
            <a-select :default-value="country" @change="val=>country=val">
              <a-select-option v-for="ctr in fullCountriesCode" :value="ctr.code" :key="ctr.code">
                {{'+'+ctr.code+' '+ctr.name+' '+ctr.chinese_name}}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :span="14">
            <a-input :placeholder="$t('login.mobileHolder')" @change="e=>mobile=e.target.value"/>
          </a-col>
        </a-row>
      </div>
      <div v-else>
        <p class="label">{{$t('login.email')}}</p>
        <a-input :placeholder="$t('login.emailHolder')" @change="e=>email=e.target.value"/>
      </div>
      <p class="label">{{$t('login.code')}}</p>
      <a-row>
        <a-col :span="18">
          <a-input :placeholder="$t('login.codeHolder')" @change="e=>code=e.target.value"/>
        </a-col>
        <a-col :span="6">
          <a-button v-if="!timer" type="primary" @click="getCode(registerWay)" block>{{$t('login.getCodeButton')}}</a-button>
          <a-button v-else type="primary" disabled block>{{timeCount}}s</a-button>
        </a-col>
      </a-row>
      <p class="label">{{$t('login.password')}}</p>
      <a-input-password :placeholder="$t('login.passwordHolder')" @change="e=>password=e.target.value"/>
      <p class="label">{{$t('login.confirmPassword')}}</p>
      <a-input-password :placeholder="$t('login.confirmPasswordHolder')" @change="e=>confirmPassword=e.target.value"/>
      <a-button class="action" type="primary" @click="register(registerWay)" block>{{$t('login.registerButton')}}</a-button>
      <span class="left"><a @click="tab='pwd-login'">{{$t('login.backToLogin')}}</a></span>
    </form>
  </div>
</template>

<script>
import { toRefs, getCurrentInstance, reactive, onBeforeMount } from "vue";
import { fullCountriesCode } from '../assets/full_countries_code.json';
import md5 from 'js-md5';
import { injectStore } from '../store'
export default {
  name: "Login",
  setup(props) {
    const { ctx } = getCurrentInstance()
    const store = injectStore()
    const data = reactive({
      fullCountriesCode,
      tab: 'pwd-login',
      registerWay: 'email',
      createAddress: true,
      rememberMe: false,
      account: '',
      password: '',
      confirmPassword: '',
      country: '86',
      mobile: '',
      email: '',
      code: '',
      timer: null,
      timeCount: 60,
    })
    onBeforeMount(() => {
      if (store.state.logined) {
        ctx.$router.push({path: '/login'})
      }
    })
    // 登录
    const login = (way) => {
      let url = null
      let params = null
      if (way === 'pwd-login') {
        url = ctx.$api.pwdLogin
        params = {
          account: data.account,
          password: md5(data.password).toUpperCase(),
          remember: data.rememberMe,
        }
      } else if (way === 'sms-login') {
        url = ctx.$api.codeLogin
        params = {
          contact: data.mobile,
          password: data.code,
          remember: data.rememberMe,
        }
      } else if (way === 'email-login') {
        url = ctx.$api.codeLogin
        params = {
          contact: data.email,
          password: data.code,
          remember: data.rememberMe,
        }
      }
      ctx.axios.post(url, params).then(res => {
        store.logined(res.data.username)
        // 如果需要回滚
        if (store.state.shouldGoback) {
          store.setGoback(false)
          ctx.$router.go(-1)
        } else {
          ctx.$router.replace({path:'/user'})
        }
      })
    }
    // 注册
    const register = (way) => {
      const contact = way === 'email' ? data.email : data.mobile
      ctx.axios.post(ctx.$api.register, {
        contact,
        password: md5(data.password).toUpperCase(),
        code: data.code,
        createAddress: data.createAddress,
      }).then(res => {
        ctx.$notification.success({
          message: ctx.$i18n.tc('login.succRegisterMsg'),
          description: ctx.$i18n.tc('login.succRegisterDesc'),
        })
        store.logined(res.data.username)
        // 如果需要回滚 
        if (store.state.shouldGoback) {
          store.setGoback(false)
          ctx.$router.go(-1)
        } else {
          ctx.$router.replace({path:'/user'})
        }
      })
    }
    // 获取验证码
    const getCode = (way) => {
      const contact = way === 'email' ? data.email : data.mobile
      ctx.axios.post(ctx.$api.sendCode, { contact }).then(res => {
        if (!data.timer) {
          data.timer = setInterval(() => {
            data.timeCount--
            if (data.timeCount < 0) {
              clearInterval(data.timer)
              data.timer = null
              data.timeCount = 60
            }
          }, 1000)
        }
      })
    }
    return { 
      ...toRefs(data),
      store,
      login,
      register,
      getCode,
    }
  },
};
</script>

<style lang="less" scoped>
@media screen and (min-width: 500px) {
  .login {
    margin: 0 auto;
    margin-top: 3em;
    max-width: 500px;
    padding: 1em;
    background-color: white;
    border-radius: 0.2em;
    box-shadow: 0 2px 5px var(--back-color);
  }
}
@media screen and (max-width: 499px) {
  .login {
    margin: 0 auto;
    max-width: 500px;
    padding: 1em;
    background-color: white;
  }
}
.login h2 {
  text-align: center;
}
.login .choices {
  text-align: center;
  margin: 2em 0 0;
}
.login .choices a {
  margin: 0 0.5em;
  color: var(--normal-color);
}
.login .choices a[active="true"] {
  color: var(--theme-color);
}
// .login form {
//   /* line-height: 3em; */
// }
.login form p.label {
  margin: 0;
  padding: 1.5em 0 0.5em 0.5em;
}
.login form button.ant-btn.action {
  margin: 2.5em 0 1em;
}
.login form span.left {
  font-size: 0.95em;
  margin-left: 0.5em;
}
.login form span a {
  color: var(--assist-color);
}
.login form span a:hover {
  color: var(--theme-color);
}
.login form span.right {
  float: right;
}
.login form span.right label {
  font-size: 0.95em;
  color: var(--assist-color);
}
</style>