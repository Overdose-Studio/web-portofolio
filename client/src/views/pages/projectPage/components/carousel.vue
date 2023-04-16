<template>
  <!-- Preview section -->
  <section class="my-5">
    <!-- Carousel container -->
    <div class="relative w-full h-56 overflow-hidden md:h-96">
      <!-- Image slider -->
      <div
        class="flex transition duration-500 ease-in-out transform"
        :style="`transform: translateX(-${currentSlide * 100}%)`"
      >
        <!-- Loop through the images -->
        <div
          v-for="(image, index) in images"
          :key="index"
          class="w-full h-96 flex-shrink-0"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            class="w-full h-full object-cover justify-center"
          />
        </div>
      </div>
      <!-- Image slider indicators -->
      <div
        class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2"
      >
        <button
          v-for="(image, index) in images"
          :key="index"
          :class="{
            'bg-gray-800': index === currentSlide,
            'bg-gray-400': index !== currentSlide,
          }"
          @click="goToSlide(index)"
          class="h-3 w-3 rounded-full"
        ></button>
      </div>

      <!-- Slider control buttons -->
      <div
        class="absolute inset-y-0 right-0 w-full flex items-center justify-between"
      >
        <!-- Previous -->
        <button
          @click="goToPrevSlide"
          class="absolute top-50 left-0 h-auto z-30 flex flex-wrap items-center justify-center px-4 cursor-pointer group focus:outline-none"
        >
          <span
            class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            <span class="sr-only">Previous</span>
          </span>
        </button>
        <!-- Next -->
        <button
          @click="goToNextSlide"
          class="absolute top-50 right-0 z-30 flex items-center justify-center px-4 cursor-pointer group focus:outline-none"
        >
          <span
            class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
            <span class="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
    <!-- Image slider preview -->
    <div class="relative w-full bg-grey-500 my-3">
      <div class="flex w-full overflow-auto">
        <button
          v-for="(image, index) in images"
          :key="index"
          class="mx-3"
          :class="{
            'border border-gray-500 border-4': index === currentSlide,
          }"
          @click="goToSlide(index)"
        >
          <div class="w-40 h-25 md:w-60 md:h-40 flex-shrink-0">
            <img
              :src="image.src"
              :alt="image.alt"
              class="w-full h-full object-cover justify-center"
            />
          </div>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 0,
      images: [
        { src: "https://via.placeholder.com/600x400", alt: "Image 1" },
        { src: "https://via.placeholder.com/600x400", alt: "Image 2" },
        { src: "https://via.placeholder.com/600x400", alt: "Image 3" },
        { src: "https://via.placeholder.com/600x400", alt: "Image 4" },
        { src: "https://via.placeholder.com/600x400", alt: "Image 5" },
        { src: "https://via.placeholder.com/600x400", alt: "Image 6" },
        { src: "https://via.placeholder.com/600x400", alt: "Image 7" },
        { src: "https://via.placeholder.com/600x400", alt: "Image 8" },
      ],
      translate: 0,
    };
  },
  methods: {
    // Function to go to the previous slide
    goToPrevSlide() {
      this.currentSlide =
        (this.currentSlide - 1 + this.images.length) % this.images.length;
      this.translate = this.currentSlide * 100;
    },
    // Function to go to the next slide
    goToNextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.images.length;
      this.translate = this.currentSlide * 100;
    },
    // Function to go to a specific slide
    goToSlide(index) {
      this.currentSlide = index;
      this.translate = this.currentSlide * 100;
    },
  },
};
</script>
