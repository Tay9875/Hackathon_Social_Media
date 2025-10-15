<template>
    <div class="max-w-md mx-auto mt-8 p-8 bg-white rounded-lg shadow">
        <h2 class="text-2xl font-bold mb-6">Edit Profile</h2>
        <form @submit.prevent="updateProfile()" class="w-full flex-1 mt-8">
            <div class="mx-auto flex flex-col gap-3.5">
                <div class="flex flex-col items-center mb-4">
                    <label class="relative cursor-pointer">
                    <input
                        type="file"
                        accept="image/*"
                        class="hidden"
                        @change="onAvatarChange"
                    />
                    <div class="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200">
                        <img
                        v-if="avatarUrl"
                        :src="avatarUrl"
                        alt="Avatar"
                        class="w-full h-full object-cover rounded-full"
                        />
                        <span v-else class="text-gray-400">Avatar</span>
                    </div>
                    </label>
                </div>
                <div class="flex space-x-4">
                    <input
                        class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text" placeholder="First Name" v-model="form.firstname" />
                    <input
                        class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text" placeholder="Last Name" v-model="form.lastname" />
                </div>
                <input
                    class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email" placeholder="Email" v-model="form.email" />
                <div class="flex space-x-4">
                    <input
                        class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="date" placeholder="Birthdate" v-model="form.birthdate" />
                    <select
                        class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        v-model="form.gender">
                        <option disabled value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button type="submit"
                    class="cursor-pointer mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span class="ml-3">
                        Update Profile
                    </span>
                </button>
            </div>
            <div class="mt-6 text-center">
                <span class="text-gray-600">Don't have an account?</span>
                <RouterLink to="/signup" class="text-indigo-500 hover:underline ml-1">Sign Up</RouterLink>
            </div>
        </form>
        <div v-if="success" class="text-green-600 mt-4">
            Profile updated successfully!
        </div>
        <div v-if="error" class="text-red-600 mt-4">
            {{ error }}
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const form = ref({
    name: '',
    bio: '',
    avatar: ''
})
const success = ref(false)
const error = ref('')

onMounted(async () => {
    try {
        console.log('Fetching profile data...')
    } catch (e) {
        error.value = 'Failed to load profile.'
    }
})

async function updateProfile() {
    success.value = false
    error.value = ''
    try {
        console.log('Updating profile with data:', form.value)
        success.value = true
    } catch (e) {
        error.value = 'Failed to update profile.'
    }
}
</script>
