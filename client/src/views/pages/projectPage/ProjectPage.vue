<template>
  <div class="max-w-screen-xl px-4 py-5 mx-auto text-left md:py-8 lg:px-12">
    <projectHeader></projectHeader>
  </div>
  <carousel></carousel>
  <div class="max-w-screen-xl px-4 py-5 mx-auto text-left md:py-8 lg:px-12">
    <projectDetail></projectDetail>
    <projectDeveloper></projectDeveloper>
    <otherProject></otherProject>
  </div>
</template>

<script>
import carousel from "./components/carousel.vue";
import projectHeader from "./components/projectHeader.vue";
import projectDeveloper from "./components/projectDeveloper.vue";
import otherProject from "./components/otherProject.vue";
import projectDetail from "./components/projectDetail.vue";

export default {
  components: {
    projectHeader,
    carousel,
    projectDetail,
    projectDeveloper,
    otherProject,
  },
};
</script>
