<template>
  <navbar></navbar>
  <hero-page v-if="pages.length > 0" :page="pages[0]"></hero-page>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import HeroPage from "./components/HeroPage.vue";

export default {
  components: {
    Navbar,
    HeroPage,
  },
  created() {
    this.getPages();
  },
  data() {
    return {
      pages: [],
    };
  },
  methods: {
    async getPages() {
      let result = await fetch("pages.json");
      let data = await result.json();

      this.pages = data;
      console.log("success load data");
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Lexend");
#app {
  font-family: "Lexend";
}
</style>
