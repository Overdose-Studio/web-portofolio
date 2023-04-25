<template>
  <div
    class="fixed top-0 left-0 right-0 bottom-0 z-50 w-full h-auto bg-gray-500 backdrop-blur-lg bg-opacity-50 p-4 overflow-hidden flex items-center justify-center"
  >
    <div
      class="flex flex-col w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700"
    >
      <!-- Modal Header -->
      <div
        class="relative w-full rounded-lg bg-white-900 divider-y justify-center p-5"
      >
        <!-- Modal Title -->
        <h3
          class="mb-4 text-2xl text-center font-medium text-gray-900 dark:text-white"
        >
          {{ title }}
        </h3>
        <!-- Close button -->
        <button
          type="button"
          class="absolute top-5 right-5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          @click="$emit('close')"
        >
          <svgIcon
            size="24"
            path="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            stroke="none"
            fill="currentColor"
            viewBox="0 0 20 20"
          />
        </button>
        <hr class="border-gray-300" />
      </div>

      <!-- Form -->
      <div class="px-6 pb-6">
        <form class="space-y-6" action="#" @submit="save">
          <div class="flex flex-col w-full h-full">
            <div>
              <label
                for="description"
                class="flex w-full mb-2 text-l font-medium text-gray-900 dark:text-white"
                >{{ heading }}</label
              >
              <textarea
                name="description"
                id="description"
                rows="10"
                class="flex p-2.5 w-full font-light text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                :placeholder="placeholder"
                v-model="text"
                required
              ></textarea>
            </div>
          </div>
          <div class="flex flex-row px-5 gap-5 justify-end">
            <hr class="border-gray-300" />
            <!-- Cancel button -->
            <button
              class="text-gray-900 bg-gray hover:bg-gray-200 border focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
              @click="$emit('close')"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              @click.prevent="save"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import svgIcon from "@/utils/svg.vue";

export default {
  components: { svgIcon },
  props: {
    // props validation with default value
    title: "",
    heading: "",
    placeholder: "",
    valueBefore: "",
  },
  data() {
    return {
      text: this.valueBefore,
    };
  },
  methods: {
    cancel() {
      this.text = this.valueBefore;
    },
    save() {
      this.$emit("update:valueBefore", this.text);
      this.$emit("close");
    },
  },
};
</script>
