<script setup>
import { ref, onMounted } from "vue";
import PostList from "@/components/PostList.vue";
import { getUsers } from "@/api/userApi.js";
import { RouterLink } from "vue-router";

const posts = ref([]);
const userlist = ref([]);

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
  <div class="bg-gray-100 min-h-screen py-10">
    <div class="container mx-auto px-6">
      <div class="flex flex-col xl:flex-row gap-8 items-start">
        <aside
          class="bg-white rounded-lg shadow p-6 w-full xl:w-64 max-h-[calc(100vh-6rem)] overflow-y-auto sticky top-20"
        >
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Utilisateurs</h2>
          <ul class="space-y-3 text-sm text-gray-700">
            <li
              v-for="user in userlist"
              :key="user.id"
              class="flex items-center gap-3"
            >
              <img
                :src="user.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg'"
                alt="Avatar"
                class="w-10 h-10 rounded-full object-cover bg-gray-200 flex-shrink-0"
              />
              <span class="truncate">
                <RouterLink :to="`/profile/${user.uuid}`" class="hover:underline"
                >
                 {{ user.firstName }} {{ user.lastName }}
            </RouterLink>
              </span>
            </li>
          </ul>
        </aside>
        <section class="flex-1 w-full">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Publications</h2>
          <PostList :posts="posts" />
        </section>
      </div>
    </div>
  </div>
</template>
