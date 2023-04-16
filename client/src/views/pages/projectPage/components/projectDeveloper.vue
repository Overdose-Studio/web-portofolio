<template>
  <!-- Developer section -->
  <section class="my-10">
    <!--Title -->
    <h1
      class="text-xl md:text-2xl font-bold leading-left tracking-tight dark:text-white text-gray-900"
    >
      Developer
    </h1>
    <!-- Developer tag -->
    <div class="inline-block justify-left overflow-x-visible">
      <div
        v-for="developer in developers"
        class="inline-block text-left justify-center bg-gray-500 rounded-full mr-3 my-3 cursor-pointer"
      >
        <div class="flex flex-row p-1">
          <div class="flex flex-col">
            <div class="relative w-10 h-10 rounded-full overflow-hidden">
              <!-- Developer Avatar -->
              <img
                src="@/assets/image/placeholder.png"
                :alt="developer.img.alt"
                class="absolute w-full h-full object-cover"
              />
            </div>
          </div>
          <div class="flex flex-col mx-2 pr-3 justify-left">
            <!-- Developer Name -->
            <h3
              class="text-s md:text-m font-bold leading-left tracking-tight dark:text-gray-900 text-white"
            >
              {{ developer.name }}
            </h3>
            <!-- Developer role -->
            <h3
              class="text-xs md:text-s font-thin leading-left tracking-tight dark:text-gray-900 text-white"
            >
              {{ developer.role }}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      currentDeveloper: 0,
      developers: [
        {
          img: { src: "@/assets/image/placeholder.png", alt: "devAvatar" },
          name: "Developers Name",
          role: "Designer",
        },
        {
          img: { src: "@/assets/image/placeholder.png", alt: "devAvatar" },
          name: "Developers Name",
          role: "Designer",
        },
        {
          img: { src: "@/assets/image/placeholder.png", alt: "devAvatar" },
          name: "Developers Name",
          role: "Designer",
        },
        {
          img: { src: "@/assets/image/placeholder.png", alt: "devAvatar" },
          name: "Developers Name",
          role: "Designer",
        },
        {
          img: { src: "@/assets/image/placeholder.png", alt: "devAvatar" },
          name: "Developers Name",
          role: "Designer",
        },
        {
          img: { src: "@/assets/image/placeholder.png", alt: "devAvatar" },
          name: "Developers Name",
          role: "Designer",
        },
        {
          img: { src: "@/assets/image/placeholder.png", alt: "devAvatar" },
          name: "Developers Name",
          role: "Designer",
        },
        {
          img: { src: "@/assets/image/placeholder.png", alt: "devAvatar" },
          name: "Developers Name",
          role: "Designer, Tech Lead, Front End, Back end",
        },
      ],
    };
  },
};
</script>
