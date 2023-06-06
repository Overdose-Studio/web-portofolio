<template>
  <hero-section :heroSection="pageContent[0]"></hero-section>
  <recentWorkSection :recentWorkSection="pageContent[2]"></recentWorkSection>
  <footerSection :footerSection="pageContent[4]"></footerSection>
</template>

<script>
import heroSection from "./sections/heroSection.vue";
import recentWorkSection from "./sections/recentWorkSection.vue";
import footerSection from "../../components/footer.vue";

export default {
  components: {
    heroSection,
    recentWorkSection,
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
