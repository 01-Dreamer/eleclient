<template>
  <router-view />
  <NavBar class="fixed-bottom" />

</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  components: {
    NavBar,
  }
}

</script>

<style scoped></style>
