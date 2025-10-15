<script setup>
import { ref, onMounted } from 'vue'
import PostList from '@/components/PostList.vue'

// Dummy posts data (replace with API call if needed)
const posts = ref([])

onMounted(() => {
    // Example: fetch posts from API
    // fetch('/api/posts').then(res => res.json()).then(data => posts.value = data)
    posts.value = [
        { id: 1, user: 'Alice', content: 'Hello world!' },
        { id: 2, user: 'Bob', content: 'Vue is awesome!' }
    ]
})
</script>

<template>
    <div>
        <h2>User Posts</h2>
        <PostList :posts="posts" />
    </div>
</template>
