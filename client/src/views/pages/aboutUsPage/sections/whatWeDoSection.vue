<template>
  <section class="bg-transprent w-full items-end">
    <div class="flex flex-col p-16 space-y-5">
      <!-- Section Title -->
      <h2
        class="mb-4 text-xl font-bold text-left tracking-tight text-gray-900 md:text-5xl dark:text-white"
      >
        {{ whatWeDoSection.sectionTitle }}
      </h2>
      <!-- Section Subtitle -->
      <h2
        class="mb-4 text-lg font-regular text-left tracking-tight text-gray-900 md:text-2xl dark:text-white"
      >
        We are a team of rich experienced developers and designers.
      </h2>
      <div class="flex flex-row space-x-5 space-y-6">
        <!-- Web App -->
        <div class="flex flex-col py-10">
          <h2
            class="text-3xl font-bold text-left tracking-tight text-gray-900 md:text-xl dark:text-white"
          >
            Web App
          </h2>
          <h2
            class="pb-10 pt-5 pr-32 text-lg font-regular text-left tracking-tight text-gray-900 md:text-sm dark:text-white"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna
          </h2>
          <div class="flex flex-row space-x-5">
            <projectPreview
              :imageSize="{ width: '150px', height: '200px' }"
            ></projectPreview>
            <projectPreview
              :imageSize="{ width: '150px', height: '150px' }"
            ></projectPreview>
          </div>
        </div>
        <!-- Mobile App -->
        <div class="flex flex-col">
          <div class="flex flex-row space-x-5">
            <projectPreview
              :imageSize="{ width: '150px', height: '250px' }"
            ></projectPreview>
            <projectPreview
              :imageSize="{ width: '150px', height: '250px' }"
            ></projectPreview>
            <projectPreview
              :imageSize="{ width: '150px', height: '250px' }"
            ></projectPreview>
          </div>
          <h2
            class="pb-5 pt-10 text-3xl font-bold text-left tracking-tight text-gray-900 md:text-xl dark:text-white"
          >
            Mobile App
          </h2>
          <h2
            class="mb-4 pr-32 text-lg font-regular text-left tracking-tight text-gray-900 md:text-sm dark:text-white"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna
          </h2>
        </div>
      </div>
      <!-- Design -->
      <div class="flex flex-row space-x-5 justify-end">
        <projectPreview
          :imageSize="{ width: '200px', height: '150px' }"
        ></projectPreview>
        <projectPreview
          :imageSize="{ width: '200px', height: '150px' }"
        ></projectPreview>
        <projectPreview
          :imageSize="{ width: '200px', height: '150px' }"
        ></projectPreview>
        <div class="flex flex-col pl-10">
          <h2
            class="text-3xl font-bold text-left tracking-tight text-gray-900 md:text-xl dark:text-white"
          >
            Design
          </h2>
          <h2
            class="pr-32 text-lg font-regular text-left tracking-tight text-gray-900 md:text-sm dark:text-white"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna
          </h2>
        </div>
      </div>
      <primaryButton
        :buttonTitle="'See More'"
        :class="'ml-auto'"
      ></primaryButton>
    </div>
  </section>
</template>

<script>
import projectPreview from "@/views/components/projectPreview.vue";
import primaryButton from "@/views/components/buttons/primaryButton.vue";

export default {
  components: { projectPreview, primaryButton },
  props: {
    // props validation with default value
    whatWeDoSection: {
      type: Object,
      default(rawProps) {
        return {
          sectionTitle: "",
          sectionContent: "",
        };
      },
    },
  },
};
</script>
