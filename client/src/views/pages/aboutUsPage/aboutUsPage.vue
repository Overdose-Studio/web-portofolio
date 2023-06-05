<template>
  <WhatWeDoSection :whatWeDoSection="pageContent[1]"></WhatWeDoSection>
  <ReasonSection :reasonSection="pageContent[3]"></ReasonSection>
  <Footer :footerSection="pageContent[4]"></Footer>
</template>

<script>
import WhatWeDoSection from "./sections/WhatWeDoSection.vue";
import ReasonSection from "./sections/ReasonSection.vue";
import Footer from "./sections/Footer.vue";

export default {
  components: {
    WhatWeDoSection,
    ReasonSection,
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
