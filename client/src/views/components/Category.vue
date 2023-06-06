<template>
  <ul
    class="flex flex-row w-full bg-white items-center mx-auto 64 p-5 shadow-lg shadow-offset-y-2 justify-center mb-6 text-gray-900 dark:text-white"
  >
    <li
      v-for="(category, index) in categories"
      :style="{
        color:
          activeCategory === index
            ? colorOptions.ACCENT_PRIMARY
            : colorOptions.PLACE_HOLDER,
      }"
    >
      <a
        href=""
        class="mr-4 md:mx-6"
        :class="{ active: activeCategory == index }"
        @click.prevent="categoryClick(index)"
        >{{ category }}</a
      >
    </li>
  </ul>
</template>
<script>
import colors from "@/assets/colors/colors";
export default {
  props: ["categories", "activeCategory", "categoryClick"],
  data() {
    return {
      colorOptions: colors,
    };
  },
};
</script>
