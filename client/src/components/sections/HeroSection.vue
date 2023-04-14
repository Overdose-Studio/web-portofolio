<template>
  <section class="bg-white dark:bg-gray-900 lg:pt-64">
    <div class="max-w-screen-xl px-4 py-8 mx-auto text-left lg:py-16 lg:px-12">
      <h1
        class="mb-4 text-4xl font-extrabold leading-left tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
      >
        {{ heroSection.sectionTitle }}
      </h1>
      <p
        class="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"
      >
        {{ heroSection.sectionContent }}
      </p>
      <div
        class="flex flex-col flex-wrap items-left mb-8 space-y-4 lg:mb-16 sm:flex-row sm:space-y-0 sm:space-x-4"
      >
        <a
          href="#"
          class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Learn more
          <svg
            class="w-5 h-5 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    // props validation with default value
    heroSection: {
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
