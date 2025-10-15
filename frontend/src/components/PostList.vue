<template>
    <div class="space-y-6">
        <Post
            v-for="post in posts"
            :key="post.id"
            :author="post.author"
            :content="post.content"
            :timestamp="post.timestamp"
            :likes="post.likes"
            :comments="post.comments"
            :avatar="post.avatar"
        />
    </div>
</template>

<script setup>
import Post from './Post.vue'

defineProps({
    posts: {
        type: Array,
        required: true,
        default: () => []
    }
})
</script>