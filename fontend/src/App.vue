<template>
  <div>
    <Header/>
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <router-view/> -->
  </div>
</template>

<script>
import Header from './components/Header.vue'
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    Header,
    // HelloWorld
  }
}
</script>
