<template>
	<div class="flex items-start space-x-4 p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200">
		<img :src="author.avatar" alt="Avatar" class="w-10 h-10 rounded-full border-2 border-gray-200 object-cover" />
		<div class="flex-1">
			<div class="flex items-center space-x-2 mb-1">
				<span class="font-semibold text-gray-900 text-base">{{ author.firstName }} {{ author.lastName }}</span>
				<span class="text-xs text-gray-400">{{ timeAgo }}</span>
			</div>
			<div class="text-gray-700 text-sm text-left bg-gray-50 rounded px-3 py-2">{{ content }}</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	author: {
		type: Object,
		required: true,
		default: () => ({
			name: 'Utilisateur',
			avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
		})
	},
	content: {
		type: String,
		required: true,
		default: 'Ceci est un commentaire.'
	},
	createdAt: {
		type: String,
		default: () => new Date().toISOString()
	}
})

const timeAgo = computed(() => {
	const now = new Date()
	const commentDate = new Date(props.createdAt)
	const diff = Math.floor((now - commentDate) / 1000)
	if (diff < 60) return `${diff}s ago`
	if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
	if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
	return `${Math.floor(diff / 86400)}d ago`
})
</script>
