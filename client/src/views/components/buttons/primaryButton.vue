<template>
  <button
    class="text-white font-bold py-3 px-6 rounded"
    :style="{
      backgroundColor: bgColor,
    }"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
  >
    {{ buttonTitle }}
  </button>
</template>

<script>
import colors from "@/assets/colors/colors";
export default {
  props: {
    buttonTitle: {
      type: String,
      required: true,
    },
    onButtonClick: {
      type: function () {
        console.log("button clicked");
      },
    },
  },
  data() {
    return {
      colorOptions: colors,
      bgColor: colors.ACCENT_PRIMARY,
    };
  },
  methods: {
    handleMouseOver() {
      // Update the text color when the button is hovered
      this.bgColor = "green-500";
    },
    handleMouseLeave() {
      // Reset the text color when the mouse leaves the button
      this.bgColor = this.colorOptions.ACCENT_PRIMARY;
    },
  },
};
</script>
