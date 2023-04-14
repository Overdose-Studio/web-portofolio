<template>
  <hero-section :heroSection="pageContent[0]"></hero-section>
  <WhatWeDoSection :whatWeDoSection="pageContent[1]"></WhatWeDoSection>
  <RecentWorkSection :recentWorkSection="pageContent[2]"></RecentWorkSection>
  <WhyChooseUsSection :reasonSection="pageContent[3]"></WhyChooseUsSection>
  <Footer :footerSection="pageContent[4]"></Footer>
</template>

<script>
import HeroSection from "./sections/HeroSection.vue";
import WhatWeDoSection from "./sections/WhatWeDoSection.vue";
import RecentWorkSection from "./sections/RecentWorkSection.vue";
import WhyChooseUsSection from "./sections/WhyChooseUsSection.vue";
import Footer from "./sections/Footer.vue";

export default {
  components: {
    HeroSection,
    WhatWeDoSection,
    RecentWorkSection,
    WhyChooseUsSection,
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
