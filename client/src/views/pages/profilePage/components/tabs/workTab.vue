<template>
  <div
    class="flex flex-wrap items-center justify-center my-5 text-gray-500 sm:justify-between"
  >
    <!-- Grid -->
    <ul class="grid w-full gap-6 md:grid-cols-3 grid-cols-2">
      <projectCard v-for="number in 10"></projectCard>
    </ul>
  </div>
</template>
<script>
import projectCard from "@/views/components/projectCard.vue";
export default {
  components: { projectCard },
};
</script>
