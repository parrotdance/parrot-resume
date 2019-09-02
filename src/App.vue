<template>
  <div id="app">
    <sidebar class="sidebar" />
    <!-- <router-view class="body" /> -->
    <home class="body" />
  </div>
</template>
<script>
import Sidebar from './views/Sidebar.vue'
import Home from './views/Home.vue'

export default {
  components: {
    Sidebar,
    Home
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
}
#app .sidebar {
  flex: 0 0 300px;
  width: 0;
}
#app .body {
  flex: 1;
  width: 0;
}
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  background-color: #201f21;
}
</style>
