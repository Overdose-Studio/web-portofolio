<template>
  <button
    class="bg-transprent hover:bg-green-500 hover:text-red-100 font-bold py-3 px-6 rounded"
    :style="{
      border: '1px solid' + colorOptions.ACCENT_PRIMARY,
      color: textColor,
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
      textColor: colors.ACCENT_PRIMARY,
    };
  },
  methods: {
    handleMouseOver() {
      // Update the text color when the button is hovered
      this.textColor = "white";
    },
    handleMouseLeave() {
      // Reset the text color when the mouse leaves the button
      this.textColor = this.colorOptions.ACCENT_PRIMARY;
    },
  },
};
</script>
