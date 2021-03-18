<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
  <p>{{store.state.counter}}</p>
</template>

<script>
import { ref,onMounted } from 'vue'
import { injectStore } from '../store'

export default {
  name: 'HelloWorld',
  props: ['msg'],
  setup() {
    const count = ref(0)
    const store = injectStore()
    onMounted(() => {
      store.increment()
    })
    return {store, count}
  },
}
</script>
