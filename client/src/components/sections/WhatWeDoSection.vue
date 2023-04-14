<template>
  <section class="bg-white dark:bg-gray-900 lg:py-32">
    <div class="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg">
      <!-- Section Title -->
      <h2
        class="mb-4 text-3xl font-bold leading-left tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white"
      >
        {{ whatWeDoSection.sectionTitle }}
      </h2>
      <!-- Button -->
      <div
        class="flex flex-wrap items-center justify-center my-10 text-gray-500 sm:justify-between"
      >
        <!-- Coloumn -->
        <ul class="grid w-full gap-6 grid-cols-3">
          <li>
            <input
              type="radio"
              id="web-app"
              name="hosting"
              value="web-app"
              class="hidden peer"
              required
            />
            <label
              for="web-app"
              class="inline-flex items-left justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg dark:hover:text-gray-300 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
            >
              <div class="block text-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-10 h-10"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
                <h1
                  class="text-xl md:text-2xl font-bold leading-left tracking-tight text-gray-900 dark:text-white"
                >
                  {{ whatWeDoSection.sectionContent.service[0] }}
                </h1>
                <div class="w-full">
                  {{ whatWeDoSection.sectionContent.serviceDescription[0] }}
                </div>
              </div>
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="mobile-app"
              name="hosting"
              value="mobile-app"
              class="hidden peer"
            />
            <label
              for="mobile-app"
              class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg dark:hover:text-gray-300 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
            >
              <div class="block text-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-10 h-10"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </svg>
                <h3
                  class="text-xl md:text-2xl font-bold leading-left tracking-tight text-gray-900 dark:text-white"
                >
                  {{ whatWeDoSection.sectionContent.service[1] }}
                </h3>
                <div class="w-full">
                  {{ whatWeDoSection.sectionContent.serviceDescription[1] }}
                </div>
              </div>
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="design"
              name="hosting"
              value="design"
              class="hidden peer"
            />
            <label
              for="design"
              class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg dark:hover:text-gray-300 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
            >
              <div class="block text-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-10 h-10"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
                  />
                </svg>
                <h1
                  class="text-xl md:text-2xl font-bold leading-left tracking-tight text-gray-900 dark:text-white"
                >
                  {{ whatWeDoSection.sectionContent.service[2] }}
                </h1>
                <div class="w-full">
                  {{ whatWeDoSection.sectionContent.serviceDescription[2] }}
                </div>
              </div>
            </label>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    // props validation with default value
    whatWeDoSection: {
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
