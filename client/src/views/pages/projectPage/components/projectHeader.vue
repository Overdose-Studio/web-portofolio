<template>
  <!-- Header section -->
  <section class="my-5">
    <div class="flex flex-row text-left justify-center">
      <div class="flex flex-col">
        <div class="relative w-20 h-20 rounded-full overflow-hidden">
          <!--Project icon -->
          <img
            src="@/assets/image/placeholder.png"
            alt="Image"
            class="absolute w-full h-full object-cover"
          />
        </div>
      </div>

      <div class="flex flex-col flex-wrap mx-5 text-left w-full justify-center">
        <!-- Project title -->
        <h3
          class="text-2xl md:text-3xl font-bold leading-left tracking-tight dark:text-white text-gray-900"
        >
          Title
        </h3>
        <!-- Project short Description -->
        <h3
          class="text-m md:text-l font-regular leading-left tracking-tight dark:text-white text-gray-900"
        >
          Project descriptions
        </h3>
      </div>
    </div>
  </section>
</template>
