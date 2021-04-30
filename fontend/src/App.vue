<template>
  <div class="content">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import { getCurrentInstance,onMounted } from 'vue'
import Header from './components/Header.vue'
import { useRouter } from 'vue-router'
import { injectStore } from './store'
export default {
  name: 'App',
  components: {
    Header,
  },
  setup() {
    const { ctx } = getCurrentInstance()
    const baseURL = '/api'
    const router = useRouter()
    const store = injectStore()
    // 请求拦截
    const requestInterceptor = config => {
      // config.headers.token = sessionStorage.getItem('token') || ''
      return config
    }
    // 响应拦截
    const responseInterceptor = response => {
      const data = response.data  
      const code = data.code
      // 201 登录状态异常
      if (code == 201) {
        store.setGoback(true)
        store.logout()
        router.push({path: '/login'})
        return data;
      } else if (code >= 400) {
        ctx.$notification.error({
          message: ctx.$i18n.tc('global.serverErrorTitle'),
          description: ctx.$i18n.tc('global.serverErrorDesc'),
        })
        return data
      } else {
        return data
      }
    }
    ctx.axios.defaults.baseURL = baseURL
    ctx.axios.interceptors.request.use(requestInterceptor)
    ctx.axios.interceptors.response.use(responseInterceptor)
    onMounted(() => {
      const language = localStorage.getItem('language') || 'en'
      ctx.$i18n.locale = language
    })
  }
}
</script>

<style lang="less">
@import '/assets/antd.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  font-family: "Noto Sans SC";
  /* margin-top: 60px; */
  z-index: 1;
}
body {
  margin: 0;
  background-color: var(--tiny-back-color);
}
// rgb(0,190,130)
:root {
  --theme-color: rgb(0,190,130);
  --words-color: #222222;
  --assist-color: rgba(0, 0, 0, .5);
  --back-color: rgba(0,0,0,.1);
  --tiny-back-color: rgba(0, 0, 0, 0.02);
}
.content {
  padding-bottom: 1em;
}
@media screen and (max-width: 400px) {
  .content {
    padding-bottom: 0;
  }
}
</style>
