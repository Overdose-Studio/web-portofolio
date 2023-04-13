<template>
  <navbar :pages="pages" :active-page="activePage"></navbar>
  <hero-page> </hero-page>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import HeroPage from "./components/HeroPage.vue";

export default {
  components: {
    Navbar,
    HeroPage,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Lexend");
#app {
  font-family: "Lexend";
}
</style>
