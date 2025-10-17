<script setup>
import { ref, onMounted } from "vue";
import PostList from "@/components/PostList.vue";
import { getUsers } from "@/api/userApi.js";
import { RouterLink } from "vue-router";

const posts = ref([]);
const userlist = ref([]);
const isUserListOpen = ref(false);

const toggleUserList = () => {
  isUserListOpen.value = !isUserListOpen.value;
};

const closeUserList = () => {
  isUserListOpen.value = false;
};

onMounted(async () => {
  try {
    userlist.value = await getUsers();
  } catch (e) {
    console.error(e);
  }
  posts.value = [
    { id: 1, user: "Alice", content: "Hello world!" },
    { id: 2, user: "Bob", content: "Vue is awesome!" },
    { id: 3, user: "Max", content: "test" },
    { id: 4, user: "Bob", content: "Vue is awesome!" },
    { id: 5, user: "Bob", content: "Vue is awesome!" },
  ];
});
</script>

<template>
  <div class="bg-gray-100 min-h-screen py-10 relative">
    <div
      v-if="isUserListOpen"
      class="fixed inset-0 bg-black/40 z-40 sm:hidden"
      @click="closeUserList"
    ></div>
    <button
      class="sm:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      type="button"
      @click="toggleUserList"
      aria-label="Afficher la liste des utilisateurs"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 14c3.866 0 7-1.79 7-4s-3.134-4-7-4-7 1.79-7 4 3.134 4 7 4Zm0 0c-3.866 0-7 1.79-7 4m7-4c3.866 0 7 1.79 7 4m-7 0c0 2.21-1.79 4-4 4m4-4c0 2.21 1.79 4 4 4"
        />
      </svg>
    </button>
    <div class="container mx-auto px-6">
      <div class="flex flex-col sm:flex-row gap-8 items-start">
        <aside
          :class="[
            'bg-white rounded-lg shadow p-6 sm:w-64 max-h-[calc(100vh-6rem)] overflow-y-auto sm:sticky sm:top-20',
            isUserListOpen ? 'block fixed inset-x-4 top-24 z-50 sm:static sm:block' : 'hidden sm:block'
          ]"
        >
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-gray-900">Users</h2>
            <button
              v-if="isUserListOpen"
              type="button"
              class="sm:hidden text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
              @click="closeUserList"
              aria-label="Fermer la liste des utilisateurs"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ul class="space-y-3 text-sm text-gray-700">
            <li
              v-for="user in userlist"
              :key="user.id"
              class="flex items-center gap-3"
            >
              <img
                :src="user.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg'"
                alt="Avatar"
                class="w-10 h-10 rounded-full object-cover bg-gray-200"
              />
              <span class="truncate">
                <RouterLink
                  :to="`/profile/${user.uuid}`"
                  class="hover:underline"
                  @click="closeUserList"
                >
                  {{ user.firstName }} {{ user.lastName }}
                </RouterLink>
              </span>
            </li>
          </ul>
        </aside>
        <section class="flex-1 w-full">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Posts</h2>
          <PostList :posts="posts" />
        </section>
      </div>
    </div>
  </div>
</template>
