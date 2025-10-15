<template>
	<div class="flex items-start space-x-3 py-2">
		<img :src="author.avatar" alt="Avatar" class="w-8 h-8 rounded-full" />
		<div>
			<div class="flex items-center space-x-2">
				<span class="font-semibold text-sm text-gray-800">{{ author.name }}</span>
				<span class="text-xs text-gray-400">{{ timeAgo }}</span>
			</div>
			<div class="text-gray-700 text-sm">{{ content }}</div>
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
