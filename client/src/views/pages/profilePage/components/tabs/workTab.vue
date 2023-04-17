<template>
  <div
    class="flex flex-wrap items-center justify-center my-5 text-gray-500 sm:justify-between"
  >
    <!-- Grid -->
    <ul class="grid w-full gap-6 md:grid-cols-3 grid-cols-2">
      <project-preview v-for="number in 10"></project-preview>
    </ul>
  </div>
</template>
<script>
import projectPreview from "@/views/components/ProjectPreview.vue";
export default {
  components: { projectPreview },
};
</script>
