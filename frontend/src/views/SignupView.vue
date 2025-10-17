<script setup>
import { addUser } from '@/api/signupApi';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const avatarUrl = ref('');
const firstname = ref('');
const lastname = ref('');
const email = ref('');
const password = ref('');
const birthdate = ref('');
const gender = ref('');

const router = useRouter();
const handleSignup = () => {
    if (email.value && password.value) {
        try {
            addUser({
                firstname: firstname.value,
                email: email.value,
                avatar: avatarUrl.value,
                password: password.value,
                description: "",
                gender: gender.value,
                lastname: lastname.value,
                birthdate: birthdate.value
            });
        } catch (error) {
            console.error('Error during signup:', error);
        }
        router.push('/');
    } else {
        alert('Please enter both email and password.');
    }
};
</script>

<template>
    <div class="min-h-[calc(100vh-128px)] flex justify-center">
        <div class="max-w-screen-xl m-0 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                <div class="flex flex-col items-center">
                    <h1 class="text-2xl xl:text-3xl font-extrabold">
                        Sign Up
                    </h1>
                    <div class="w-full flex-1 mt-8">
                        <form @submit.prevent="handleSignup()" class="mx-auto flex flex-col gap-3.5">
                            <div class="flex flex-col items-center mb-4">
                                <div class="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200 mb-2">
                                    <img
                                        v-if="avatarUrl"
                                        :src="avatarUrl"
                                        alt="Avatar"
                                        class="w-full h-full object-cover rounded-full"
                                        @error="avatarUrl = ''"
                                    />
                                    <span v-else class="text-gray-400">Avatar</span>
                                </div>
                                <input
                                    class="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text"
                                    placeholder="Avatar image URL"
                                    v-model="avatarUrl"
                                />
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