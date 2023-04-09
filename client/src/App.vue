<template>
  <navbar
    :pages = "pages"
    :active-page = "activePage"
  ></navbar>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lexend');
#app {
  font-family: 'Lexend';
}
</style>
