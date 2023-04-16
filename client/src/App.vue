<template>
  <navbar></navbar>
  <!-- <hero-page v-if="pages.length > 0" :page="pages[0]"></hero-page> -->
  <project-page></project-page>
</template>

<script>
import Navbar from "./views/components/Navbar.vue";
import HeroPage from "./views/pages/landingPage/HeroPage.vue";
import ProjectPage from "./views/pages/projectPage/ProjectPage.vue";

export default {
  components: {
    Navbar,
    HeroPage,
    ProjectPage,
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
