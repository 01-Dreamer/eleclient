<template>

  <div class="wrapper">
    <router-view />
    <NavBar class="footer" />
  </div>

</template>


<script>
import NavBar from './components/NavBar.vue';

export default {
  components: {
    NavBar,
  }
}

</script>


<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;

  z-index: 2000;
}
</style>
