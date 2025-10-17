<template>
    <div class="bg-white rounded-lg shadow p-6 mb-6 w-full">
        <div class="flex items-center mb-4">
            <img
                class="w-12 h-12 rounded-full mr-3"
                :src="author.avatar"
                alt="User avatar"
            />
            <div>
                <div class="font-semibold text-gray-900">{{ author.name }}</div>
                <div class="text-sm text-gray-500">{{ author.title }}</div>
                <div class="text-xs text-gray-400">{{ timeAgo }}</div>
            </div>
        </div>
        <div class="mb-4 text-gray-800">
            {{ content }}
        </div>
        <div v-if="image" class="mb-4">
            <img :src="image" alt="Post image" class="rounded-lg w-full" />
        </div>
        <div class="flex justify-between text-gray-500 text-sm border-t pt-3 mb-2">
            <button class="flex items-center hover:text-blue-600">
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M14 9l-3 6h4l-3 6"></path>
                </svg>
                Like
            </button>
            <button class="flex items-center hover:text-blue-600">
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"></path>
                </svg>
                Comment
            </button>
            <button class="flex items-center hover:text-blue-600">
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
                Share
            </button>
        </div>
        <div v-if="comments && comments.length" class="mt-4">
            <div class="text-xs text-gray-500 mb-1">Comments:</div>
            <Comment
                v-for="(comment, idx) in comments"
                :key="idx"
                :author="comment.author"
                :content="comment.content"
                :createdAt="comment.createdAt"
            />
        </div>
    </div>
</template>

<script setup>

import Comment from './Comment.vue'
import { computed } from 'vue'

const props = defineProps({
    author: {
        type: Object,
        required: true,
        default: () => ({
            name: 'Jane Doe',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            title: 'Software Engineer'
        })
    },
    content: {
        type: String,
        required: true,
        default: 'This is a sample post content.'
    },
    image: {
        type: String,
        default: ''
    },
    createdAt: {
        type: String,
        default: () => new Date().toISOString()
    },
    comments: {
        type: Array,
        default: () => [
            {
                author: {name: 'John Smith', avatar: 'https://randomuser.me/api/portraits/men/45.jpg'},
                content: 'Great post!',
                createdAt: new Date().toISOString()
            }
        ]
    }
})

const timeAgo = computed(() => {
    const now = new Date()
    const postDate = new Date(props.createdAt)
    const diff = Math.floor((now - postDate) / 1000)
    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
})
</script>