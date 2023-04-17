<template>
  <div class="w-1/3">
    <div
      class="absolute top-20 transform translate-y-40 w-full max-w-sm bg-white border border-gray-200 p-5 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
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
      <div class="flex flex-col items-center pb-10">
        <img
          class="w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
          src="@/assets/image/placeholder.png"
          alt="Bonnie image"
        />
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {{ developerData.name }}
        </h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">{{
          developerData.role
        }}</span>
      </div>
      <h5 class="mb-1 text-l font-medium text-gray-900 dark:text-white">
        Contact me
      </h5>
      <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
        <li v-for="link in developerData.links" class="py-3 sm:py-4">
          <a class="cursor-pointer" :href="link.url">
            <div class="flex flex-shrink-0 items-center space-x-4">
              <img
                class="w-8 h-8 rounded-full object-cover"
                src="@/assets/image/placeholder.png"
                alt="Neil image"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ link.url }}
                </p>
              </div>
            </div>
          </a>
        </li>
      </ul>
      <h5 class="mb-1 text-l font-medium text-gray-900 dark:text-white">
        About me
      </h5>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ developerData.description }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      developerData: {
        name: "Developer name",
        role: "Developer Role",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec eros id velit tempor congue. Etiam tincidunt turpis eget justo efficitur lobortis. Aliquam vel gravida leo. Pellentesque pharetra turpis id purus efficitur, sit amet bibendum nisl facilisis. Donec posuere ligula at justo ullamcorper, a luctus nisl tincidunt. Morbi aliquam enim vitaefinibus suscipit. Suspendisse potenti. Sed hendrerit finibus lectus, vel vehicula dolor eleifend vel.",
        links: [
          { media: "", url: "https://www.google.com/" },
          { media: "", url: "https://www.google.com/" },
          { media: "", url: "https://www.google.com/" },
          { media: "", url: "https://www.google.com/" },
        ],
      },
    };
  },
};
</script>
