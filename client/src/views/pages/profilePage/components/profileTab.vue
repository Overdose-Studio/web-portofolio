<template>
  <div class="w-2/3">
    <div
      class="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400"
    >
      <div v-for="(item, index) in menuItems" :key="index" class="mr-2">
        <button
          :class="[
            activeIndex === index
              ? 'text-white bg-blue-600 active dark:bg-gray-800 dark:text-blue-500'
              : 'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300',
            'inline-block p-4 rounded-lg',
          ]"
          @click.prevent="navigate(index)"
        >
          {{ item.title }}
        </button>
      </div>
    </div>
    <div class="my-3">
      <worksTab v-if="activeIndex == 0"></worksTab>
      <educationTab v-if="activeIndex == 1"></educationTab>
    </div>
  </div>
</template>

<script>
import educationTab from "./tabs/educationTab.vue";
import worksTab from "./tabs/workTab.vue";

export default {
  components: {
    educationTab,
    worksTab,
  },
  data() {
    return {
      menuItems: [{ title: "Works" }, { title: "Education" }],
      activeIndex: 0,
    };
  },
  methods: {
    navigate(index) {
      if (!this.menuItems[index].disabled) {
        this.activeIndex = index;
        // window.location.href = this.menuItems[index].href;
      }
    },
  },
};
</script>
