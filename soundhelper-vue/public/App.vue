<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
import HomeView from './views/HomeView.vue'

export default {
name: 'App',
components: {
  HomeView,
},
data() {
  return {};
},
};

</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
html {font-size:16px;}
body {font-family: 'Noto Sans KR', sans-serif;}

#app {
  width: 320px;
  height: 568px;
}
</style>