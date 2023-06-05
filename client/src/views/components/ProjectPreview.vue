<template>
  <div class="block text-left">
    <img
      class="rounded-lg shadow-md border-2 border-gray-400 object-cover"
      :style="{ width: imageSize.width, height: imageSize.height }"
      src="https://via.placeholder.com/400x600"
    />
  </div>
</template>
<script>
export default {
  props: {
    // imageSrc: {
    //   type: String,
    //   required: true,
    // },
    imageSize: {
      type: Object,
      required: true,
    },
  },
};
</script>
