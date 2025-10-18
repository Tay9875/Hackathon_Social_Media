
<template>
	<form @submit.prevent="submitComment" class="mt-4 bg-white rounded-lg p-4 shadow-sm">
		<textarea
			v-model="comment"
			placeholder="Write a comment..."
			class="w-full resize-none min-h-[72px] border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
		></textarea>
		<div class="mt-3 flex items-center justify-between gap-3">
			<div class="flex items-center gap-2">
				<button type="submit" class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-md shadow hover:bg-indigo-600">
					Send
				</button>
				<button type="button" @click="clearComment" class="text-sm text-gray-500 hover:text-gray-700">Clear</button>
			</div>
			<div class="text-xs text-gray-400">Please be respectful in your comments</div>
		</div>
	</form>
</template>

<script setup>
import { ref } from 'vue';
import { addComment as apiAddComment } from '../api/commentApi.js';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
	userUuid: {
		type: String,
		required: true
	}
});
const emit = defineEmits(['comment-added']);

const comment = ref('');
const submitting = ref(false);

async function submitComment() {
	if (!comment.value.trim()) return;
	submitting.value = true;
	try {
		const newComment = await apiAddComment({
			message: comment.value,
			profile: props.userUuid
		});
		if (newComment) {
            console.log('New comment added:', newComment);
			emit('comment-added', newComment);
			comment.value = '';
		}
	} catch (e) {
		// Optionally handle error
	}
	submitting.value = false;
}

function clearComment() {
	comment.value = '';
}
</script>