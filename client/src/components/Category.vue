<template>
  <ul
    class="flex flex-wrap items-center mx-auto 64 p-5 shadow-lg shadow-offset-y-2 justify-left mb-6 text-gray-900 dark:text-white"
  >
    <li v-for="(category, index) in categories">
      <a href="#" class="mr-4 hover:underline md:mx-6">{{ category }}</a>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    categories: "",
  },
};
</script>
