<template>
  <div class="content">
    <Header/>
    <div><router-view/></div>
  </div>
</template>

<script>
import { getCurrentInstance,onMounted } from 'vue'
import Header from './components/Header.vue'
export default {
  name: 'App',
  components: {
    Header,
  },
  setup() {
    onMounted(() => {
      const { ctx } = getCurrentInstance()
      const language = localStorage.getItem('language') || 'en'
      ctx.$i18n.locale = language
      // ctx.axios.get('/user/add').then(response => {
      //   console.log(response)
      // })
      // console.log(ctx.axios.get)
    })
  }
}
</script>

<style lang="less">
@import 'ant-design-vue/dist/antd.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  font-family: "Noto Sans SC";
  /* margin-top: 60px; */
}
body {
  margin: 0;
}
// rgb(0,190,130)
:root {
  --theme-color: rgb(0,190,130);
  --words-color: #222222;
  --assist-color: rgba(0, 0, 0, .5);
  --back-color: rgba(0,0,0,.1);
  --tiny-back-color: rgba(0, 0, 0, 0.02);
}
</style>
