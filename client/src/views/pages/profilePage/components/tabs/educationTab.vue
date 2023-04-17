<template>
  <div
    class="w-full bg-white border border-gray-200 p-5 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="flex justify-end">
      <button
        class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </button>
    </div>
    <h2 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
      Education
    </h2>
    <ul class="space-y-4 text-gray-500 list-disc dark:text-gray-400 ml-10">
      <li v-for="(education, index) in educations" :key="index">
        <div class="flex flex-row">
          <h3
            class="mb-1 mr-5 text-xl font-medium text-gray-900 dark:text-white"
          >
            {{ education.startYear }}-{{ education.endYear }}
          </h3>
          <div class="col">
            <h3
              class="mb-1 mr-5 text-2xl font-medium text-gray-900 dark:text-white"
            >
              {{ education.degree }} - {{ education.major }}
            </h3>
            <h3
              class="mb-1 mr-5 text-xl font-medium text-gray-900 dark:text-white"
            >
              {{ education.description }}
            </h3>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      educations: [
        {
          degree: "Bachelor",
          major: "Informatic Engineer",
          description: "blablablablablablabla",
          startYear: "2018",
          endYear: "2023",
        },
        {
          degree: "Master",
          major: "Visual Communication Design",
          description: "blablablablablablabla",
          startYear: "2024",
          endYear: "2027",
        },
      ],
    };
  },
};
</script>
