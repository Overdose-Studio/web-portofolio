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
          Links
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
      <div class="px-6 pb-6 w-full h-full">
        <p class="w-full mb-2 text-l font-medium text-gray-900 dark:text-white">
          Get closer with customer
        </p>
        <form class="space-y-6" @submit="save">
          <div
            v-for="(link, index) in links"
            :key="index"
            class="flex flex-row space-x-5"
          >
            <input
              type="url"
              name="{{link}}{{ index+1 }}"
              id="{{link}}{{ index+1 }}"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Link URL"
              v-model="links[index].url"
              required
            />
            <!-- Delete Button -->
            <button
              class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
              type="button"
              @click.prevent="deleteLink(index)"
            >
              <svgIcon
                size="24"
                path="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                stroke="currentColor"
                fill="none"
              />
            </button>
          </div>
          <!-- Add link button -->
          <button
            v-if="links.length < 4"
            class="flex p-2.5 font-light text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            @click.prevent="addLink"
          >
            <svgIcon
              size="20"
              path="M12 4.5v15m7.5-7.5h-15"
              stroke="currentColor"
              fill="none"
            />
            Add Link
          </button>
          <div class="flex flex-row px-5 gap-5 justify-end">
            <hr class="border-gray-300" />
            <!-- Cancel button -->
            <button
              class="text-gray-900 bg-gray hover:bg-gray-200 border focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
              @click.prevent="cancel"
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
  computed: {
    copiedProps() {
      return this.linksData.map((link) => ({ ...link }));
    },
  },
  props: {
    // props validation with default value
    linksData: {
      type: Object,
      default(rawProps) {
        return {
          media: " ",
          url: " ",
        };
      },
    },
  },
  created() {
    this.links = this.copiedProps;
    console.log(this.links);
  },
  data() {
    return {
      newlink: { media: "", url: "" },
      links: [],
    };
  },
  methods: {
    addLink() {
      this.newLink = { media: "", url: "" };
      this.links.push(this.newLink);
    },
    deleteLink(index) {
      this.links.splice(index, 1);
    },
    cancel() {
      this.links = this.linksData;
    },
    removeEmptyLink() {
      this.links = this.links.filter((link) => link.url !== "");
    },
    save() {
      this.removeEmptyLink();
      this.$emit("update:linksData", this.links);
      this.$emit("close");
    },
  },
};
</script>
