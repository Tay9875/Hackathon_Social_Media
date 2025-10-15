<template>
    <div class="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <div v-if="user">
            <h1 class="text-3xl font-bold mb-4">{{ user.name }}</h1>
            <p class="mb-2"><span class="font-semibold">Email:</span> {{ user.email }}</p>
            <p class="mb-2"><span class="font-semibold">Username:</span> {{ user.username }}</p>
            <p class="mb-2"><span class="font-semibold">Bio:</span> {{ user.bio }}</p>
        </div>
        <div v-else>
            <p class="text-gray-500">Loading user information...</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProfileView',
    data() {
        return {
            user: null,
        };
    },
    created() {
        const username = this.$route.params.username;
        this.fetchUserProfile(username);
    },
    methods: {
        fetchUserProfile(username) {
            // Replace with actual API call using username
            const users = {
                johndoe: {
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    username: 'johndoe',
                    bio: 'Web developer and social media enthusiast.',
                },
                thomluck: {
                    name: 'Thomas Luck',
                    email: 'thom.luck@example.com',
                    username: 'thomluck',
                    bio: 'Designer and photographer.',
                },
            };
            this.user = users[username] || null;
        },
    },
};
</script>
