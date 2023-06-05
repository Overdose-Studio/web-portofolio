<template>
  <section class="bg-white dark:bg-gray-900 lg:py-32">
    <div class="px-4 mx-auto text-left md:max-w-screen-md lg:max-w-screen-lg">
      <!-- Section Title -->
      <h2
        class="mb-4 text-3xl font-bold leading-left tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white"
      >
        {{ reasonSection.sectionTitle }}
      </h2>
      <!-- Button -->
      <div
        class="flex flex-wrap items-center justify-left my-10 text-gray-500 sm:justify-between"
      >
        <!-- Reason coloumn -->
        <ul class="grid w-full gap-6 grid-cols-3">
          <li v-for="(reason, index) in reasonSection.sectionContent.reasons">
            <label
              class="inline-flex items-left justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
            >
              <div class="block text-left">
                <h2
                  class="mb-4 text-3xl font-bold leading-left tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white"
                >
                  {{ index + 1 }}
                </h2>
                <h1
                  class="text-xl md:text-2xl font-bold leading-left tracking-tight text-gray-900 dark:text-white"
                >
                  {{ reason }}
                </h1>
                <div class="w-full">
                  {{ reasonSection.sectionContent.reasonDescriptions[index] }}
                </div>
              </div>
            </label>
          </li>
        </ul>
      </div>
      <!-- Heading -->
      <div class="flex w-full justify-between items-center">
        <h2
          class="mb-4 text-3xl font-bold leading-left text-gray-900 md:text-4xl lg:text-5xl dark:text-white"
        >
          {{ reasonSection.sectionContent.sectionHeading }}
        </h2>
        <a
          :href="`${reasonSection.sectionContent.link.url}`"
          class="mr-4 hover:underline md:mr-6"
          >{{ reasonSection.sectionContent.link.text }}</a
        >
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    // props validation with default value
    reasonSection: {
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
