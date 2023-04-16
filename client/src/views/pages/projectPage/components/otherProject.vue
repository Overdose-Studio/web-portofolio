<template>
  <!-- Other project section -->
  <section class="my-5">
    <!-- Header -->
    <h1
      class="text-xl md:text-2xl font-bold leading-left tracking-tight dark:white text-text-gray-900"
    >
      Other projects you might like
    </h1>
    <!-- Project Preview -->
    <div
      class="flex flex-wrap items-center justify-center my-5 text-gray-500 sm:justify-between"
    >
      <!-- Grid -->
      <ul class="grid w-full gap-6 md:grid-cols-4 grid-cols-3">
        <project-preview v-for="number in 10"></project-preview>
      </ul>
    </div>
  </section>
</template>

<script>
import projectPreview from "../../../components/ProjectPreview.vue";
export default {
  components: {
    projectPreview,
  },
};
</script>
