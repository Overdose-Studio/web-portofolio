<template>
  <div
    class="w-full bg-white border border-gray-200 p-5 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="flex flex-row justify-between">
      <h2 class="mb-5 text-xl font-medium text-gray-900 dark:text-white">
        Education
      </h2>
    </div>

    <div
      class="flex flex-row text-gray-500 dark:text-gray-400 hover:bg-gray-200 p-5 justify-between items-center"
      v-for="(education, index) in educations"
      :key="index"
      @mouseover="education.isHovered = true"
      @mouseleave="education.isHovered = false"
    >
      <div class="flex felx-row">
        <h2 class="mb-1 mr-5 font-bold text-gray-900 dark:text-white">
          {{ education.school }} | {{ education.startYear }}-{{
            education.endYear
          }}
        </h2>

        <div class="flex flex-col">
          <h3 class="mb-1 mr-5 font-bold text-gray-900 dark:text-white">
            {{ education.degree }} - {{ education.major }}
          </h3>
          <p class="mb-1 mr-5 text-gray-500 dark:text-white">
            {{ education.description }}
          </p>
        </div>
      </div>
      <button
        v-if="education.isHovered"
        class="block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
        type="button"
        @click.prevent="education.showModal = true"
      >
        <svgIcon
          size="24"
          path="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          stroke="currentColor"
          fill="none"
        />
      </button>
      <editEducationModal
        v-if="education.showModal"
        :educationData="educations[index]"
        @update:education="education = $event"
        @close="education.showModal = false"
      >
      </editEducationModal>
    </div>
  </div>
</template>
<script>
import editEducationModal from "../modals/editEducationModal.vue";
import svgIcon from "@/utils/svg.vue";

export default {
  components: { editEducationModal, svgIcon },
  data() {
    return {
      educations: [
        {
          school: "harvard",
          degree: "Bachelor",
          major: "Informatic Engineer",
          description: "blablablablablablabla",
          startYear: "2018",
          endYear: "2023",
          isHovered: false,
          showModal: false,
        },
        {
          school: "harvard",
          degree: "Master",
          major: "Visual Communication Design",
          description: "blablablablablablabla",
          startYear: "2024",
          endYear: "2027",
          isHovered: false,
          showModal: false,
        },
      ],
    };
  },
};
</script>
