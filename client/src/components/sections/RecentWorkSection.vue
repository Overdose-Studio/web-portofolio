<template>
  <section class="bg-white dark:bg-gray-900 lg:py-32">
    <div class="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg">
      <!-- Section Title -->
      <h2
        class="mb-4 text-3xl font-bold leading-left tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white"
      >
        Our Recent Work
      </h2>
    </div>
    <!-- Category Navigation -->
    <category></category>
    <div class="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg">
      <!-- Project Preview -->
      <div
        class="flex flex-wrap items-center justify-center my-10 text-gray-500 sm:justify-between"
      >
        <!-- Coloumn -->
        <ul class="grid w-full gap-6 grid-cols-4">
          <li>
            <project-preview></project-preview>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Category from "../Category.vue";
import ProjectPreview from "../ProjectPreview.vue";

export default {
  components: {
    Category,
    ProjectPreview,
  },
};
</script>
