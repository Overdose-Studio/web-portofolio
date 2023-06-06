<template>
  <div
    class="bg-red-100 my-16 mx-32 text-center md:max-w-screen justify-center bg-cover bg-center bg-no-repeat bg-custom-image"
  >
    <whatWeDoSection :whatWeDoSection="pageContent[1]"></whatWeDoSection>
    <reasonSection :reasonSection="pageContent[3]"></reasonSection>
  </div>
  <footerSection :footerSection="pageContent[4]"></footerSection>
</template>

<script>
import whatWeDoSection from "./sections/whatWeDoSection.vue";
import reasonSection from "./sections/reasonSection.vue";
import footerSection from "../../components/footer.vue";

export default {
  components: {
    whatWeDoSection,
    reasonSection,
    footerSection,
  },

  props: {
    // props validation with default value
    page: {
      type: Object,
      default(rawProps) {
        return {
          pageTitle: "",
          pageContents: "",
        };
      },
    },
  },
  data() {
    return {
      pageContent: this.page.pageContents,
    };
  },
};
</script>
<style scoped>
.bg-custom-image {
  background-image: url("@/assets/image/aboutUsBackground.png");
}
</style>
