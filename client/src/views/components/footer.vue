<template>
  <section
    class="dark:bg-gray-900 py-5 lg:py-10"
    :style="{ backgroundColor: colorOptions.TEXT_PRMARY }"
  >
    <div class="max-w-screen-xl h-1/3 px-4 mx-auto text-left lg:px-12">
      <div class="flex flex-col">
        <!-- Section Title -->
        <div class="flex flex-row mb-4 space-x-2 items-center">
          <h2
            class="text-lg font-bold leading-left tracking-tight text-white md:text-3lg dark:text-white"
          >
            Overdose
          </h2>
          <h2
            class="text-md font-thin leading-left tracking-tight md:text-md dark:text-white"
            :style="{ color: colorOptions.ACCENT_PRIMARY }"
          >
            Studio
          </h2>
        </div>
        <!-- Contact buttons -->
        <div
          class="justify-start text-gray-500 sm:justify-between pb-5 border-b"
          :style="{
            'border-bottom': '1px solid' + colorOptions.ACCENT_PRIMARY,
          }"
        >
          <!-- Coloumn -->
          <ul class="flex flex-row flex-wrap w-full justify-start">
            <!-- Email -->
            <li>
              <a
                :href="`${footerSection.sectionContent.link[0]}`"
                type="button"
                class="text-white hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
              >
                <!-- Email icon -->
                <svgIcon
                  size="20"
                  path="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                />
                <span class="sr-only">Icon description</span>
              </a>
            </li>
            <!-- Instagram -->
            <li>
              <a
                :href="`${footerSection.sectionContent.link[1]}`"
                type="button"
                class="text-white hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
              >
                <!-- Instagram icon -->
                <svgIcon
                  size="20"
                  path="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  stroke="none"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                />
                <span class="sr-only">Icon description</span>
              </a>
            </li>
            <!-- Whatsapp -->
            <li>
              <a
                :href="`${footerSection.sectionContent.link[2]}`"
                type="button"
                class="text-white hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
              >
                <!-- Whatsapp icon -->
                <svgIcon
                  size="20"
                  path="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
                  stroke="none"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                />
                <span class="sr-only">Icon description</span>
              </a>
            </li>
          </ul>
        </div>
        <!-- All right recerve -->
        <h2
          class="text-xs font-light text-center tracking-tight text-white pt-5"
        >
          © 2023 OverdoseStudio. All rights reserved.
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
import svgIcon from "@/utils/svg.vue";
import colors from "@/assets/colors/colors";
export default {
  components: { svgIcon },
  props: {
    // props validation with default value
    footerSection: {
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
      borderColor: colors.ACCENT_PRIMARY,
    };
  },
};
</script>
