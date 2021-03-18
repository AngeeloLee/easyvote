import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { storeSymbol, provideStore } from './store'
import i18n from './lang'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './index.css'

createApp(App)
    .use(router)
    .use(i18n)
    .use(Antd)
    .provide(storeSymbol, provideStore())
    .mount('#app')
