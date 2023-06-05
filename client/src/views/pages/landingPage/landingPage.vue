<template>
  <hero-section :heroSection="pageContent[0]"></hero-section>
  <RecentWorkSection :recentWorkSection="pageContent[2]"></RecentWorkSection>
  <Footer :footerSection="pageContent[4]"></Footer>
</template>

<script>
import heroSection from "./sections/heroSection.vue";
import RecentWorkSection from "./sections/recentWorkSection.vue";
import Footer from "./sections/Footer.vue";

export default {
  components: {
    heroSection,
    RecentWorkSection,
    Footer,
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
