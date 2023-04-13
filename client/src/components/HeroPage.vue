<template>
  <hero-section> </hero-section>
  <WhatWeDoSection></WhatWeDoSection>
  <RecentWorkSection></RecentWorkSection>
  <WhyChooseUsSection></WhyChooseUsSection>
  <Footer></Footer>
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
};
</script>
