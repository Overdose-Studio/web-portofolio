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
          Profile
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
      <form class="space-y-6 px-6 py-6" action="#" @submit="save">
        <div class="flex flex-row gap-5 items-center">
          <div class="flex flex-col">
            <!-- Change Avatar button -->
            <label for="upload-photo" class="cursor-pointer">
              <img
                :src="profile.avatarSrc"
                class="w-24 h-24 mb-3 rounded-full object-cover mr-8"
              />
            </label>
            <input
              v-show="false"
              id="upload-photo"
              type="file"
              accept="image/*"
              @change="uploadImage"
            />
          </div>

          <!-- Change name & role -->
          <div class="flex flex-col w-full pr-5">
            <div class="flex flex-row w-full gap-5">
              <div>
                <label
                  for="firstName"
                  class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >First Name</label
                >
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="First Name"
                  v-model="profile.firstName"
                  required
                />
              </div>
              <div>
                <label
                  for="firstName"
                  class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Last Name</label
                >
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Last Name"
                  v-model="profile.lastName"
                  required
                />
              </div>
            </div>

            <div>
              <label
                for="role"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your Role</label
              >
              <input
                type="role"
                name="role"
                id="role"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="coder, designer, etc"
                v-model="profile.role"
                required
              />
            </div>
          </div>
        </div>

        <div class="flex flex-row px-5 gap-5 justify-end">
          <hr class="border-gray-300" />
          <!-- Cancel button -->
          <button
            class="text-gray-900 bg-gray hover:bg-gray-200 border focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
            @click.prevent="cancel"
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
</template>
<script>
import svgIcon from "@/utils/svg.vue";

export default {
  components: { svgIcon },
  props: {
    profileData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      file: null,
      profile: { ...this.profileData },
    };
  },
  methods: {
    cancel() {
      this.profile = this.profileData;
      this.$emit("close");
    },
    save() {
      this.$emit("update:profile", this.profile);
      this.$emit("close");
    },
    uploadImage(event) {
      const file = event.target.files[0];
      if (file) {
        this.uploadedImage = file;
        this.profile.avatarSrc = URL.createObjectURL(file); // Replace placeholder image URL with uploaded image URL
      }
    },
  },
};
</script>
