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

        <div class="mt-8">
            <h2 class="text-xl font-bold mb-4">Commentaires</h2>
            <form @submit.prevent="addComment" class="mb-6 flex flex-col gap-2">
                <textarea v-model="newComment" placeholder="Ajouter un commentaire..." class="border rounded p-2" rows="2"></textarea>
                <button type="submit" class="self-end bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Envoyer</button>
            </form>
            <div v-if="comments.length">
                <Comment
                    v-for="comment in comments"
                    :key="comment.id"
                    :author="comment.author"
                    :content="comment.content"
                    :createdAt="comment.createdAt"
                />
            </div>
            <div v-else class="text-gray-400">Aucun commentaire pour ce profil.</div>
        </div>
    </div>
</template>

<script>
import Comment from '../components/Comment.vue';

export default {
    name: 'ProfileView',
    components: { Comment },
    data() {
        return {
            user: null,
            comments: [],
            newComment: '',
            loadingComments: false,
        };
    },
    async created() {
        const username = this.$route.params.username;
        this.fetchUserProfile(username);
        await this.fetchComments(username);
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
                    name: 'ThomLuck',
                    email: 'thom.luck@example.com',
                    username: 'thomluck',
                    bio: 'Designer and photographer.',
                },
            };
            this.user = users[username] || null;
        },
        async fetchComments(username) {
            this.loadingComments = true;
            // Simule un appel API (remplacer par un vrai fetch plus tard)
            await new Promise(resolve => setTimeout(resolve, 700));
            // Mock : commentaires selon le profil
            if (username === 'johndoe') {
                this.comments = [
                    {
                        id: 1,
                        author: {
                            name: 'Alice',
                            avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
                        },
                        content: 'Super profil, bravo !',
                        createdAt: new Date(Date.now() - 3600 * 1000).toISOString(),
                    },
                    {
                        id: 2,
                        author: {
                            name: 'Bob',
                            avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
                        },
                        content: 'Très inspirant !',
                        createdAt: new Date(Date.now() - 7200 * 1000).toISOString(),
                    },
                ];
            } else if (username === 'thomluck') {
                this.comments = [
                    {
                        id: 3,
                        author: {
                            name: 'Charlie',
                            avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
                        },
                        content: 'J’adore tes photos !',
                        createdAt: new Date(Date.now() - 1800 * 1000).toISOString(),
                    }
                ];
            } else {
                this.comments = [];
            }
            this.loadingComments = false;
        },
        addComment() {
            if (!this.newComment.trim()) return;
            this.comments.unshift({
                id: Date.now(),
                author: {
                    name: 'Moi',
                    avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
                },
                content: this.newComment,
                createdAt: new Date().toISOString(),
            });
            this.newComment = '';
        },
    },
};
</script>
