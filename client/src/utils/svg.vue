<template>
  <svg
    :width="size"
    :height="size"
    :viewBox="viewBox"
    stroke-width="1.5"
    :stroke="stroke"
    :fill="fill"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      stroke-linecap="round"
      stroke-linejoin="round"
      :d="path"
    />
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: [Number, String],
      default: 24,
    },
    path: {
      type: String,
      required: true,
    },
    stroke: {
      type: String,
      required: true,
    },
    fill: {
      type: String,
      required: true,
    },
    viewBox: {
      type: [Number, String],
      default: "0 0 24 24",
    },
  },
};
</script>
