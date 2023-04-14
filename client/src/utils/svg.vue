<template>
  <svg
    xmlns="{{param.xmls}}"
    fill="{{param.fill}}"
    viewBox="{{param.viewBox}}"
    stroke-width="{{param.strokeWidth}}"
    stroke="{{param.strokeColor}}"
    class="{{param.class}}"
  >
    <path
      stroke-linecap="{{param.strokeLineca}}"
      stroke-linejoin="{{param.xmls}}"
      d="{{param.d}}"
    />
  </svg>
</template>

<script>
export default {
  props: {
    param: {
      type: Object,
      default(rawProps) {
        return {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: "1.5",
          strokeColor: "currentColor",
          class: "w-10 h-10",

          strokeLineCap: "round",
          StrokeLineJoin: "round",
          d: "",
        };
      },
    },
  },
};
</script>
