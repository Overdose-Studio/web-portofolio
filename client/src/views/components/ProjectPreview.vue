<template>
  <li>
    <!-- <button type="button" id="mobile-app" name="hosting" value="mobile-app" /> -->
    <label
      for="mobile-app"
      class="inline-flex items-center justify-between w-full text-gray-500 bg-white rounded-lg cursor-pointer dark:hover:text-gray-300 dark:peer-checked:text-blue-500 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <div class="block text-left">
        <img
          class="h-auto w-auto rounded-lg"
          src="@/assets/image/placeholder.png"
        />
        <div
          class="flex flex-row items-center text-gray-500 sm:justify-between"
        >
          <!-- Coloumn -->
          <ul
            class="flex flex-row flex-wrap w-full items-center justify-between"
          >
            <!-- Title -->
            <li>
              <h3
                class="text-l md:text-xl font-bold leading-left tracking-tight text-gray-900 dark:text-white"
              >
                Title
              </h3>
            </li>
            <!-- Like & View -->
            <li>
              <ul class="flex flex-row flex-wrap w-full justify-center px-1">
                <!-- Like icon -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 md:w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                <!-- Likes -->
                <h3
                  class="text-s md:text-m font-regular leading-left tracking-tight text-gray-900 dark:text-white"
                >
                  123
                </h3>
                <!-- View icon -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 md:w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <!-- Views -->
                <h3
                  class="text-s md:text-m font-regular leading-left tracking-tight text-gray-900 dark:text-white"
                >
                  123
                </h3>
              </ul>
            </li>
          </ul>
        </div>
        <div class="w-full">Owners</div>
      </div>
    </label>
  </li>
</template>

<script></script>
