<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const avatarUrl = ref(null);
const firstname = ref('');
const lastname = ref('');
const email = ref('');
const password = ref('');

const onAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            avatarUrl.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const router = useRouter();
const handleSignup = () => {
    // Simulate a signup process
    if (email.value && password.value) {
        // In a real app, you'd verify credentials here
        alert(`Signed up with: ${email.value}`);
        router.push('/'); // Redirect to home after signup
    } else {
        alert('Please enter both email and password.');
    }
};
</script>

<template>
    <div class="min-h-[calc(100vh-120px)] flex justify-center">
        <div class="max-w-screen-xl m-0 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                <div class="flex flex-col items-center">
                    <h1 class="text-2xl xl:text-3xl font-extrabold">
                        Sign Up
                    </h1>
                    <div class="w-full flex-1 mt-8">
                        <form @submit.prevent="handleSignup()" class="mx-auto flex flex-col gap-3.5">
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
                                  type="text" placeholder="Firstname" v-model="firstname" />
                              <input
                                  class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                  type="text" placeholder="Lastname" v-model="lastname" />
                            </div>
                            <div class="flex space-x-4">
                              <input
                                  class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                  type="date" placeholder="Birthdate" v-model="birthdate" />
                              <select
                                class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                v-model="gender"
                              >
                                <option value="" disabled selected>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                              </select>
                            </div>
                            <input
                                class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                type="email" placeholder="Email" v-model="email" />
                            <input
                                class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                type="password" placeholder="Password" v-model="password" />
                            <button type="submit"
                                class="cursor-pointer mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                    <path d="M20 8v6M23 11h-6" />
                                </svg>
                                <span class="ml-3">
                                    Sign Up
                                </span>
                            </button>
                        </form>
                        <div class="mt-6 text-center">
                            <span class="text-gray-600">Already have an account?</span>
                            <router-link to="/login" class="text-indigo-500 hover:underline ml-1">Log In</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>