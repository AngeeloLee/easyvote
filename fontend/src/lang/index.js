import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    menu: {
      switchLang: '中文',
      proposal: 'PROPOSAL',
      vote: 'VOTE',
      about: 'ABOUT',
      login: 'LOGIN',
      tally: 'TALLY',
    }
  },
  zh: {
    menu: {
      switchLang: 'English',
      proposal: '新投票',
      vote: '投票',
      about: '关于',
      login: '登录',
      tally: '计票',
    }
  }
}

export default new createI18n({
  locale: 'en',
  messages,
})