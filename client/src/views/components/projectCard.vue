<template>
  <li>
    <!-- <button type="button" id="mobile-app" name="hosting" value="mobile-app" /> -->
    <label
      for="mobile-app"
      class="inline-flex items-center justify-between w-full text-gray-500 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:peer-checked:text-blue-500 peer-checked:text-blue-600 hover:text-gray-600 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <div class="block text-left">
        <img
          class="h-auto w-auto rounded-lg"
          src="@/assets/image/placeholder.png"
        />
        <div class="flex flex-col text-gray-500 sm:justify-between px-2">
          <!-- Coloumn -->
          <ul
            class="flex flex-row flex-wrap w-full items-center justify-between"
          >
            <!-- Title -->
            <li>
              <h3
                class="text-md md:text-l font-bold leading-left tracking-tight text-gray-900 dark:text-white"
              >
                Title
              </h3>
            </li>
            <!-- Like & View -->
            <li>
              <ul
                class="flex flex-row flex-wrap w-full justify-center items-center px-1 space-x-1"
              >
                <!-- Like icon -->
                <svgIcon
                  size="15"
                  path=" M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                />
                <!-- Likes -->
                <h3
                  class="text-xs md:text-s font-regular leading-left tracking-tight text-gray-900 dark:text-white"
                >
                  123
                </h3>
                <!-- View icon -->
                <svgIcon
                  size="15"
                  path="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                />
                <!-- Views -->
                <h3
                  class="text-xs md:text-s font-light leading-left tracking-tight text-gray-900 dark:text-white"
                >
                  123
                </h3>
              </ul>
            </li>
          </ul>
          <!-- Owners -->
          <h3
            class="text-sm md:text-md font-bold leading-left tracking-tight text-gray-900 dark:text-white"
          >
            Owners
          </h3>
        </div>
      </div>
    </label>
  </li>
</template>

<script>
import svgIcon from "@/utils/svg.vue";
export default {
  components: { svgIcon },
};
</script>
