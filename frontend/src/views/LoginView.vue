<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const email = ref('');
const password = ref('');
const router = useRouter();
const handleLogin = () => {
    // Simulate a login process
    if (email.value && password.value) {
        // In a real app, you'd verify credentials here
        alert(`Logged in as: ${email.value}`);
        router.push('/'); // Redirect to home after login
    } else {
        alert('Please enter both email and password.');
    }
};
</script>

<template>
    <div class="min-h-[calc(100vh-128px)] flex justify-center">
        <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                <div class="flex flex-col items-center">
                    <h1 class="text-2xl xl:text-3xl font-extrabold">
                        Login
                    </h1>
                    <form @submit.prevent="handleLogin()" class="w-full flex-1 mt-8">
                        <div class="mx-auto flex flex-col gap-3.5">
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
                                    Login
                                </span>
                            </button>
                        </div>
                        <div class="mt-6 text-center">
                            <span class="text-gray-600">Don't have an account?</span>
                            <RouterLink to="/signup" class="text-indigo-500 hover:underline ml-1">Sign Up</RouterLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>