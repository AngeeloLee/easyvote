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
      <a-input v-model="account" :placeholder="$t('login.accountHolder')"/>
      <p class="label">{{$t('login.password')}}</p>
      <a-input-password v-model="password" :placeholder="$t('login.passwordHolder')"/>
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
        <a-col :span="6">
          <a-select :default-value="country" @change="val=>country=val">
            <a-select-option v-for="code in countriesCode" :value="code" :key="code">
              {{'+'+code}}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="18">
          <a-input v-model="mobile" :placeholder="$t('login.mobileHolder')"/>
        </a-col>
      </a-row>
      <p class="label">{{$t('login.code')}}</p>
      <a-row>
        <a-col :span="18">
          <a-input v-model="mobile" :placeholder="$t('login.codeHolder')"/>
        </a-col>
        <a-col :span="6">
          <a-button type="primary" @click="getCode('sms')" block>{{$t('login.getCodeButton')}}</a-button>
        </a-col>
      </a-row>
      <a-button class="action" type="primary" @click="login('sms-login')" block>{{$t('login.loginButton')}}</a-button>
      <a-row>
        <a-col :span="14">
          <span class="left"><a @click="tab='pwd-login'">{{$t('login.passwordLogin')}}</a></span><br>
          <span class="left"><a @click="tab='email-login'">{{$t('login.emailLogin')}}</a></span>
        </a-col>
      </a-row>
    </form>
    <!-- 邮件验证码登录 -->
    <form v-else-if="tab==='email-login'" class="email-login">
      <p class="label">{{$t('login.email')}}</p>
      <a-input v-model="email" :placeholder="$t('login.emailHolder')"/>
      <p class="label">{{$t('login.code')}}</p>
      <a-row>
        <a-col :span="18">
          <a-input v-model="mobile" :placeholder="$t('login.codeHolder')"/>
        </a-col>
        <a-col :span="6">
          <a-button type="primary" @click="getCode('email')" block>{{$t('login.getCodeButton')}}</a-button>
        </a-col>
      </a-row>
      <a-button class="action" type="primary" @click="login('email-login')" block>{{$t('login.loginButton')}}</a-button>
      <a-row>
        <a-col :span="14">
          <span class="left"><a @click="tab='pwd-login'">{{$t('login.passwordLogin')}}</a></span><br>
          <span class="left"><a @click="tab='sms-login'">{{$t('login.smsLogin')}}</a></span>
        </a-col>
      </a-row>
    </form>
    <!-- 注册 -->
    <form v-else-if="tab==='register'" class="email-login">
      <a-row>
        <a-col :span="14">
          <p class="label">{{$t('login.registerWay')}}</p>
          <a-radio-group v-model="registerWay" @change="e=>registerWay=e.target.value">
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
          <a-col :span="6">
            <a-select :default-value="country" @change="val=>country=val">
              <a-select-option v-for="code in countriesCode" :value="code" :key="code">
                {{'+'+code}}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :span="18">
            <a-input v-model="mobile" :placeholder="$t('login.mobileHolder')"/>
          </a-col>
        </a-row>
      </div>
      <div v-else>
        <p class="label">{{$t('login.email')}}</p>
        <a-input v-model="email" :placeholder="$t('login.emailHolder')"/>
      </div>
      <p class="label">{{$t('login.code')}}</p>
      <a-row>
        <a-col :span="18">
          <a-input v-model="mobile" :placeholder="$t('login.codeHolder')"/>
        </a-col>
        <a-col :span="6">
          <a-button type="primary" @click="getCode('email')" block>{{$t('login.getCodeButton')}}</a-button>
        </a-col>
      </a-row>
      <a-button class="action" type="primary" @click="register" block>{{$t('login.registerButton')}}</a-button>
      <span class="left"><a @click="tab='pwd-login'">{{$t('login.backToLogin')}}</a></span>
    </form>
  </div>
</template>

<script>
import { toRefs, getCurrentInstance, reactive } from "vue";
import { countriesCode } from '../../public/countries_code.json';
import md5 from 'js-md5';
export default {
  name: "Login",
  setup() {
    const { ctx } = getCurrentInstance()
    // const md5 = require('crypto-js/hmac-md5')
    const data = reactive({
      countriesCode,
      tab: 'pwd-login',
      registerWay: 'mobile',
      createAddress: true,
      rememberMe: false,
      account: '',
      password: '',
      country: '86',
      mobile: '',
      email: '',
      code: '',
    })
    const login = (way) => {
      if (way === 'pwd-login') {
        // ctx.$axios.
      } else if (way === 'sms-login') {

      } else if (way === 'email-login') {

      }
    }
    const register = () => {

    }
    const getCode = (way) => {
      // console.log('get code way: ', way)
      // console.log('country: ', data.country)
    }
    return { 
      ...toRefs(data),
      login,
      register,
      getCode,
    }
  },
};
</script>

<style lang="less" scoped>
.login {
  margin: 0 auto;
  margin-top: 3em;
  max-width: 500px;
  padding: 1em;
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