import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    menu: {
      switchLang: '中文',
      create: 'CREATE',
      vote: 'VOTE',
      about: 'ABOUT',
      login: 'LOGIN',
      tally: 'TALLY',
      verify: 'VERIFY',
    },
    login: {
      title: 'Login or register with the EasyVote',
      login: 'LOGIN',
      register: 'REGISTER',
      account: 'Account',
      accountHolder: 'username/mobile/eamil',
      password: 'Password',
      passwordHolder: 'password',
      mobile: 'Mobile',
      mobileHolder: 'mobile number',
      email: 'E-mail',
      emailHolder: 'E-mail address',
      code: 'Verification code',
      codeHolder: 'Verification code you received',
      rememberMe: 'Remember me',
      smsLogin: 'Use SMS code to login',
      emailLogin: 'Use Email code to login',
      passwordLogin: 'Use password to login',
      backToLogin: 'Back to login',
      loginButton: 'LOGIN',
      registerButton: 'REGISTER',
      getCodeButton: 'GET',
      registerWay: 'Register way',
      createAddress: 'Create Ethereum account?',
      useMobile: 'Mobile',
      useEmail: 'Email',
    }
  },


  zh: {
    menu: {
      switchLang: 'English',
      create: '创建投票',
      vote: '投票',
      about: '关于',
      login: '登录',
      tally: '计票',
      verify: '验票',
    },
    login: {
      title: '登录或注册易投',
      login: '登录',
      register: '注册',
      account: '账户',
      accountHolder: '用户名/手机号/邮箱',
      password: '密码',
      passwordHolder: '密码',
      mobile: '手机号码',
      mobileHolder: '手机号码',
      email: '电子邮件',
      emailHolder: '电子邮件地址',
      code: '验证码',
      codeHolder: '您收到的验证码',
      rememberMe: '记住我',
      smsLogin: '使用短信验证码登录',
      emailLogin: '使用邮件验证码登录',
      passwordLogin: '使用密码登录',
      backToLogin: '返回登录',
      loginButton: '登 录',
      registerButton: '注 册',
      getCodeButton: '获取',
      registerWay: '注册方式',
      createAddress: '创建以太坊账户？',
      useMobile: '手机号码',
      useEmail: '电子邮件',
    }
  }
}

export default new createI18n({
  locale: 'en',
  messages,
})