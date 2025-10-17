<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import { validateToken } from "@/api/tokenApi";

const isAuthenticated = ref(false);
const mobileMenuOpen = ref(false);

function checkTokenValidity() {
  const token = localStorage.getItem("token");
  isAuthenticated.value = token && validateToken(token);
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}

onMounted(() => {
  checkTokenValidity();
});
</script>

<template>
  <header class="fixed top-0 left-0 w-full z-20 shadow-lg backdrop-blur-xl bg-white/75">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-3" aria-label="Global">
      <div class="flex flex-1">
        <RouterLink to="/" class="-m-1.5 p-1.5">
          <span>Social Media</span>
        </RouterLink>
      </div>
      
      <div class="flex md:hidden">
        <button @click="toggleMobileMenu" type="button" class="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-controls="mobile-menu" :aria-expanded="mobileMenuOpen">
          <span class="sr-only">Open main menu</span>
          <svg v-if="!mobileMenuOpen" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="hidden md:flex flex-1 items-center justify-end gap-4">
        <RouterLink to="/statistics" class="text-sm/6">Statistics</RouterLink>
        <div v-if="isAuthenticated" class="flex items-center gap-4">
          <RouterLink to="/profile" class="text-sm/6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded transition-colors duration-200 flex items-center">
            Profile <span aria-hidden="true" class="ml-2">&rarr;</span>
          </RouterLink>
          <RouterLink to="/logout" class="text-sm/6 text-white bg-indigo-500 hover:bg-blue-600 px-4 py-2 rounded transition-colors duration-200 flex items-center">
            Log out <span aria-hidden="true" class="ml-2">&rarr;</span>
          </RouterLink>
        </div>
        <div v-else class="flex items-center gap-4">
          <RouterLink to="/login" class="text-sm/6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded transition-colors duration-200 flex items-center">
            Log in <span aria-hidden="true" class="ml-2">&rarr;</span>
          </RouterLink>
          <RouterLink to="/signup" class="text-sm/6 text-white bg-indigo-500 hover:bg-blue-600 px-4 py-2 rounded transition-colors duration-200 flex items-center">
            Sign Up <span aria-hidden="true" class="ml-2">&rarr;</span>
          </RouterLink>
        </div>
      </div>
    </nav>
    
    <transition name="fade">
      <div v-if="mobileMenuOpen" class="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-30" id="mobile-menu">
        <div class="flex flex-col gap-2 p-4">
          <RouterLink @click="toggleMobileMenu" to="/statistics" class="text-sm/6 py-2 px-2 rounded hover:bg-gray-100">Statistics</RouterLink>
          <template v-if="isAuthenticated">
            <RouterLink @click="toggleMobileMenu" to="/profile" class="text-sm/6 py-2 px-2 rounded hover:bg-gray-100 flex items-center">
              Profile <span aria-hidden="true" class="ml-2">&rarr;</span>
            </RouterLink>
            <RouterLink @click="toggleMobileMenu" to="/logout" class="text-sm/6 py-2 px-2 rounded bg-indigo-500 text-white hover:bg-blue-600 flex items-center">
              Log out <span aria-hidden="true" class="ml-2">&rarr;</span>
            </RouterLink>
          </template>
          <template v-else>
            <RouterLink @click="toggleMobileMenu" to="/login" class="text-sm/6 py-2 px-2 rounded hover:bg-gray-100 flex items-center">
              Log in <span aria-hidden="true" class="ml-2">&rarr;</span>
            </RouterLink>
            <RouterLink @click="toggleMobileMenu" to="/signup" class="text-sm/6 py-2 px-2 rounded bg-indigo-500 text-white hover:bg-blue-600 flex items-center">
              Sign Up <span aria-hidden="true" class="ml-2">&rarr;</span>
            </RouterLink>
          </template>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
