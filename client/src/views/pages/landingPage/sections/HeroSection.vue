<template>
  <section class="bg-white dark:bg-gray-900">
    <div
      class="max-w-screen-xl h-screen px-4 py-8 mx-auto text-left lg:px-12 bg-cover bg-center"
      :style="{
        backgroundImage: `url(@/assets/image/landingPageBackground.png)`,
      }"
    >
      <div class="flex flex-row">
        <!-- Content -->
        <div class="flex flex-col w-1/2">
          <!-- Subtitle -->
          <p
            class="mt-20 text-lg font-light text-gray-500 lg:text-xl dark:text-gray-400"
          >
            {{ heroSection.sectionContent }}
          </p>
          <!-- Title -->
          <h1
            class="mb-12 text-4xl font-extrabold leading-left text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
          >
            {{ heroSection.sectionTitle }}
          </h1>
          <!-- Buttons -->
          <div class="flex flex-row space-x-5">
            <!-- See Our Portofolio -->
            <primaryButton :buttonTitle="'See Our Portofolio'"></primaryButton>
            <!-- About us -->
            <outlineButton :buttonTitle="'About Us'"> </outlineButton>
          </div>
        </div>
        <!-- Project Preview -->
        <div class="flex flex-col w-1/2 h-screen justify-center space-y-10">
          <div class="flex flex-row justify-end items-end space-x-10">
            <projectPreview
              :imageSize="{ width: '150px', height: '150px' }"
            ></projectPreview>
            <projectPreview
              :imageSize="{ width: '150px', height: '300px' }"
            ></projectPreview>
          </div>
          <div class="flex flex-row justify-end space-x-10">
            <projectPreview
              :imageSize="{ width: '150px', height: '200px' }"
            ></projectPreview>
            <projectPreview
              :imageSize="{ width: '150px', height: '150px' }"
            ></projectPreview>
            <projectPreview
              :imageSize="{ width: '150px', height: '150px' }"
            ></projectPreview>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import primaryButton from "../../../components/buttons/primaryButton.vue";
import outlineButton from "../../../components/buttons/outlineButton.vue";
import projectPreview from "@/views/components/projectPreview.vue";
export default {
  components: { primaryButton, outlineButton, projectPreview },
  props: {
    // props validation with default value
    heroSection: {
      type: Object,
      default(rawProps) {
        return {
          sectionTitle: "",
          sectionContent: "",
        };
      },
    },
  },
  data() {
    return {
      backgroundImageUrl: "@/assets/image/landingPageBackground.png",
    };
  },
};
</script>
