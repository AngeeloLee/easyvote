import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from './request'
import vueAxios from 'vue-axios'
import { storeSymbol, provideStore } from './store'
import i18n from './lang'
import Antd from 'ant-design-vue'
import Api from './api'

const app = createApp(App)
app.use(router)
app.use(vueAxios, axios)
app.use(i18n)
app.use(Antd)
app.config.globalProperties.$api = Api
app.provide(storeSymbol, provideStore())
app.mount('#app')
