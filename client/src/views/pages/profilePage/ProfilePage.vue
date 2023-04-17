<template>
  <profileTumbnail></profileTumbnail>
  <div class="max-w-screen-xl px-4 py-5 mx-auto text-left md:py-8 lg:px-12">
    <div class="flex justify-between">
      <profileContact></profileContact>
      <profileTab></profileTab>
    </div>
  </div>
</template>
<script>
import profileTumbnail from "./components/profileTumbnail.vue";
import profileContact from "./components/profileContact.vue";
import profileTab from "./components/profileTab.vue";

export default {
  components: {
    profileTumbnail,
    profileContact,
    profileTab,
  },
};
</script>
