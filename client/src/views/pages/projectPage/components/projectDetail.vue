<template>
  <!-- Section project detail -->
  <section class="my-10">
    <div class="flex justify-between">
      <!-- Detail -->
      <p class="w-3/4">{{ message }}</p>
      <!-- Like button -->
      <button class="self-start" @click="toggleHeart">
        <svg
          v-if="isHeartFilled"
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 text-red-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10 17.66l-7.66-7.66C.54 8.03 0 6.74 0 5.33 0 2.39 2.39 0 5.33 0c1.76 0 3.37.86 4.35 2.19C10.63.86 12.24 0 14 0c2.94 0 5.33 2.39 5.33 5.33 0 1.41-.54 2.7-1.34 3.67L10 17.66z"
          />
        </svg>
        <svg
          v-else
          aria-hidden="true"
          class="w-8 h-8 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="-1 -1 21 21"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M10 17.66l-7.66-7.66C.54 8.03 0 6.74 0 5.33 0 2.39 2.39 0 5.33 0c1.76 0 3.37.86 4.35 2.19C10.63.86 12.24 0 14 0c2.94 0 5.33 2.39 5.33 5.33 0 1.41-.54 2.7-1.34 3.67L10 17.66z"
          ></path>
        </svg>
      </button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec eros id velit tempor congue. Etiam tincidunt turpis eget justo efficitur lobortis. Aliquam vel gravida leo. Pellentesque pharetra turpis id purus efficitur, sit amet bibendum nisl facilisis. Donec posuere ligula at justo ullamcorper, a luctus nisl tincidunt. Morbi aliquam enim vitaefinibus suscipit. Suspendisse potenti. Sed hendrerit finibus lectus, vel vehicula dolor eleifend vel.",
      isHeartFilled: false,
    };
  },
  methods: {
    toggleHeart() {
      this.isHeartFilled = !this.isHeartFilled;
    },
  },
};
</script>
