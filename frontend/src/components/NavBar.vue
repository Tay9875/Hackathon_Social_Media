<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { Bars3Icon } from "@heroicons/vue/24/outline";

const mobileMenuOpen = ref(false);
</script>

<template>
  <header class="fixed top-0 left-0 w-full z-20 shadow-lg">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-3"
      aria-label="Global"
    >
      <div class="flex flex-1">
        <RouterLink to="/" class="-m-1.5 p-1.5">
          <span class="">Social Media</span>
        </RouterLink>
      </div>
      <div class="flex flex-1 items-center justify-end gap-4">
        <RouterLink to="/statistics" class="text-sm/6"
          >Statistics</RouterLink
        >
        <RouterLink
          to="/login"
          class="text-sm/6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded transition-colors duration-200 flex items-center"
        >
          Log in <span aria-hidden="true" class="ml-2">&rarr;</span>
        </RouterLink>
        <RouterLink
          to="/signup"
          class="text-sm/6 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors duration-200 flex items-center"
        >
          Sign Up <span aria-hidden="true" class="ml-2">&rarr;</span>
        </RouterLink>
      </div>
    </nav>
  </header>
</template>
