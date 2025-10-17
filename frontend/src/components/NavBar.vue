<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";

const isAuthenticated = ref(false);

function checkTokenValidity() {
  // const token = localStorage.getItem("token");
  // if (token) {
  //   fetch("/api/auth/validate", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => res.ok)
  //     .then((valid) => {
  //       isAuthenticated.value = valid;
  //     })
  //     .catch(() => {
  //       isAuthenticated.value = false;
  //     });
  // } else {
  //   isAuthenticated.value = false;
  // }
}

onMounted(() => {
  checkTokenValidity();
});
</script>

<template>
  <header class="fixed top-0 left-0 w-full z-20 shadow-lg backdrop-blur-xl bg-white/75">
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
        <div v-if="isAuthenticated" class="flex items-center gap-4">
          <RouterLink
            to="/profile"
            class="text-sm/6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded transition-colors duration-200 flex items-center"
          >
            Profile <span aria-hidden="true" class="ml-2">&rarr;</span>
          </RouterLink>
          <RouterLink
            to="/logout"
            class="text-sm/6 text-white bg-indigo-500 hover:bg-blue-600 px-4 py-2 rounded transition-colors duration-200 flex items-center"
          >
            Log out <span aria-hidden="true" class="ml-2">&rarr;</span>
          </RouterLink>
        </div>
        <div v-else class="flex items-center gap-4">
          <RouterLink
            to="/login"
            class="text-sm/6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded transition-colors duration-200 flex items-center"
          >
            Log in <span aria-hidden="true" class="ml-2">&rarr;</span>
          </RouterLink>
          <RouterLink
            to="/signup"
            class="text-sm/6 text-white bg-indigo-500 hover:bg-blue-600 px-4 py-2 rounded transition-colors duration-200 flex items-center"
          >
            Sign Up <span aria-hidden="true" class="ml-2">&rarr;</span>
          </RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>
