<template>
  <section
    class="h-screen lg:py-16"
    :style="{ backgroundColor: colorOptions.ACCENT_TERTIARY }"
  >
    <div
      class="px-4 py-5 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg"
    >
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
          <ProjectCard v-for="number in 4"></ProjectCard>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import colors from "@/assets/colors/colors";
import category from "../../../components/category.vue";
import ProjectCard from "../../../components/projectCard.vue";

export default {
  components: {
    category,
    ProjectCard,
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
  data() {
    return {
      colorOptions: colors,
    };
  },
};
</script>
