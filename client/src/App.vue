<template>
  <navbar></navbar>
  <landingPage v-if="pages.length > 0" :page="pages[0]"></landingPage>
  <!-- <project-page></project-page> -->
  <!-- <profile-page></profile-page> -->
</template>

<script>
import navbar from "./views/components/navbar.vue";
import landingPage from "./views/pages/landingPage/landingPage.vue";
import ProjectPage from "./views/pages/projectPage/ProjectPage.vue";
import ProfilePage from "./views/pages/profilePage/ProfilePage.vue";

export default {
  components: {
    navbar,
    landingPage,
    ProjectPage,
    ProfilePage,
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
