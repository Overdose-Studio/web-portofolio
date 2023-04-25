<template>
  <div class="w-1/3">
    <div
      class="absolute top-20 transform translate-y-40 w-full max-w-xs bg-white border border-gray-200 p-5 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="flex justify-end min-h-5"></div>
      <!-- Developer Profile -->
      <div
        class="flex flex-col items-center p-5"
        @mouseover="isProfileHovered = true"
        @mouseleave="isProfileHovered = false"
      >
        <div class="relative flex flex-row w-full pl-10">
          <img
            class="w-24 h-24 mb-3 rounded-full shadow-lg object-cover mx-8"
            :src="developerData.profile.avatarSrc"
          />
          <button
            v-if="isProfileHovered"
            class="absolute top-0 right-0 ml-10 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
            @click.provent="showEditContactModal = true"
          >
            <svgIcon
              size="24"
              path="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              stroke="currentColor"
              fill="none"
            />
          </button>
        </div>

        <h2 class="text-xl font-medium text-gray-900 dark:text-white">
          {{
            developerData.profile.firstName +
            " " +
            developerData.profile.lastName
          }}
        </h2>
        <span class="text-sm text-gray-500 dark:text-gray-400">{{
          developerData.profile.role
        }}</span>
      </div>
      <!-- Developer Contacts -->
      <div
        class="flex flex-col"
        @mouseover="isContactHovered = true"
        @mouseleave="isContactHovered = false"
      >
        <div class="flex flex-row justify-between">
          <h5 class="mb-3 text-l font-medium text-gray-900 dark:text-white">
            Contact me
          </h5>
          <!-- Contact link edit button -->
          <button
            v-if="isContactHovered"
            class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
            @click.prevent="showEditLinkModal = true"
          >
            <svgIcon
              size="24"
              path="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              stroke="currentColor"
              fill="none"
            />
          </button>
        </div>
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
          <li v-for="link in developerData.links" class="py-3 md:py-4">
            <a class="cursor-pointer" :href="link.url">
              <div class="flex flex-shrink-0 items-center space-x-4">
                <img
                  class="w-8 h-8 rounded-full object-cover"
                  src="@/assets/image/placeholder.png"
                  alt="Developer Avatar"
                />
                <p
                  class="text-sm max-h-20 truncate text-gray-500 dark:text-gray-400"
                >
                  {{ link.url }}
                </p>
              </div>
            </a>
          </li>
        </ul>
      </div>

      <!-- Developer description -->
      <div
        class="flex flex-col"
        @mouseover="isDescriptionHovered = true"
        @mouseleave="isDescriptionHovered = false"
      >
        <div class="flex flex-row justify-between">
          <h5 class="my-3 text-l font-medium text-gray-900 dark:text-white">
            About me
          </h5>
          <button
            v-if="isDescriptionHovered"
            class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
            @click.provent="showEditTextModal = true"
          >
            <svgIcon
              size="24"
              path="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              stroke="currentColor"
              fill="none"
            />
          </button>
        </div>

        <p class="text-sm text-justify text-gray-500 dark:text-gray-400">
          {{ developerData.description }}
        </p>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <editProfileModal
    v-if="showEditContactModal"
    @close="showEditContactModal = false"
    @update:profile="developerData.profile = $event"
    :profileData="developerData.profile"
  ></editProfileModal>
  <editTextModal
    v-if="showEditTextModal"
    :title="'Edit Description'"
    :heading="'Tell us more about you'"
    :placeholder="'Tell us more about you'"
    :valueBefore="developerData.description"
    @update:valueBefore="developerData.description = $event"
    @close="showEditTextModal = false"
  >
  </editTextModal>
  <editLinkModal
    v-if="showEditLinkModal"
    @close="showEditLinkModal = false"
    @update:linksData="developerData.links = $event"
    :linksData="developerData.links"
  >
  </editLinkModal>
</template>
<script>
import editContactModal from "../components/modals/editContactModal.vue";

import editLinkModal from "../components/modals/editLinkModal.vue";
import editProfileModal from "../components/modals/editProfileModal.vue";
import editTextModal from "@/views/components/TextModal.vue";
import svgIcon from "@/utils/svg.vue";

export default {
  components: {
    editContactModal,
    editProfileModal,
    editLinkModal,
    editTextModal,
    svgIcon,
  },

  data() {
    return {
      showEditTextModal: false,
      showEditContactModal: false,
      showEditLinkModal: false,
      isDescriptionHovered: false,
      isContactHovered: false,
      isProfileHovered: false,

      developerData: {
        type: String,
        profile: {
          firstName: "firstName",
          lastName: "lastName",
          role: "Developer Role",
          avatarSrc: "https://via.placeholder.com/150",
        },

        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec eros id velit tempor congue. Etiam tincidunt turpis eget justo efficitur lobortis. Aliquam vel gravida leo. Pellentesque pharetra turpis id purus efficitur, sit amet bibendum nisl facilisis. Donec posuere ligula at justo ullamcorper, a luctus nisl tincidunt. Morbi aliquam enim vitaefinibus suscipit. Suspendisse potenti. Sed hendrerit finibus lectus, vel vehicula dolor eleifend vel.",
        links: [
          { media: "", url: "https://www.google.com/" },
          { media: "", url: "https://www.google.com/" },
          { media: "", url: "https://www.google.com/" },
        ],
      },
    };
  },
  methods: {
    editContactToggle() {
      this.editModalIsOpen = !this.editModalIsOpen;
      console.log(this.editModalIsOpen);
    },
  },
};
</script>
