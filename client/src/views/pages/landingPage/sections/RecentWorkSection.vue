<template>
  <section class="bg-white dark:bg-gray-900 lg:py-32">
    <div class="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg">
      <!-- Section Title -->
      <h2
        class="mb-4 text-3xl font-bold leading-left tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white"
      >
        {{ recentWorkSection.sectionTitle }}
      </h2>
    </div>
    <!-- Category Navigation -->
    <category
      :categories="recentWorkSection.sectionContent.categories"
    ></category>
    <div class="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg">
      <!-- Project Preview -->
      <div
        class="flex flex-wrap items-center justify-center my-10 text-gray-500 sm:justify-between"
      >
        <!-- Grid -->
        <ul class="grid w-full gap-6 md:grid-cols-4 grid-cols-3">
          <project-preview v-for="number in 10"></project-preview>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Category from "../../../components/Category.vue";
import ProjectPreview from "../../../components/ProjectPreview.vue";

export default {
  components: {
    Category,
    ProjectPreview,
  },
  props: {
    // props validation with default value
    recentWorkSection: {
      type: Object,
      default(rawProps) {
        return {
          sectionTitle: "",
          sectionContent: "",
        };
      },
    },
  },
};
</script>
