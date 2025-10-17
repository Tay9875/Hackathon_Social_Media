
<template>
    <div class="m-8 mt-24 p-8 bg-white rounded-lg shadow-md">
        <div v-if="user">
            <div class="flex items-center gap-4 mb-4">
                <img :src="user.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg'" alt="Avatar" class="w-16 h-16 rounded-full border" />
                <div>
                    <h1 class="text-3xl font-bold">{{ user.firstName }} {{ user.lastName }}</h1>
                    <p class="text-gray-500 text-sm">{{ user.email }}</p>
                </div>
            </div>
            <div class="mb-2"><span class="font-semibold">Genre :</span> {{ user.gender }}</div>
            <div class="mb-2"><span class="font-semibold">Date de naissance :</span> {{ formatDate(user.birthDate) }}</div>
            <div class="mb-2"><span class="font-semibold">Adresse :</span> {{ user.address }}</div>
            <div class="mb-2"><span class="font-semibold">Description :</span> {{ user.description }}</div>
        </div>
        <div v-else>
            <p class="text-gray-500">Chargement du profil...</p>
        </div>

        <div class="mt-8">
            <h2 class="text-xl font-bold mb-4">Commentaires</h2>
            <form @submit.prevent="addComment" class="mb-6 flex flex-col gap-2">
                <textarea v-model="newComment" placeholder="Ajouter un commentaire..." class="border rounded p-2" rows="2"></textarea>
                <button type="submit" class="self-end bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">Envoyer</button>
            </form>
            <div v-if="comments.length">
                <div v-for="comment in comments" :key="comment.id" class="relative group">
                    <Comment
                        :author="comment.author"
                        :content="comment.message"
                        :createdAt="comment.createdAt"
                    />
                    <div v-if="isAuthor(comment)" class="absolute top-2 right-2 flex gap-2 opacity-80 group-hover:opacity-100">
                        <button @click="editComment(comment)" class="text-xs px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500">Modifier</button>
                        <button @click="deleteComment(comment.id)" class="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Supprimer</button>
                    </div>
                </div>
            </div>
            <div v-else class="text-gray-400">Aucun commentaire pour ce profil.</div>

            <!-- Modal édition -->
            <div v-if="editingComment" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div class="bg-white p-6 rounded shadow-lg w-80">
                    <h3 class="text-lg font-bold mb-2">Modifier le commentaire</h3>
                    <textarea v-model="editContent" class="border rounded p-2 w-full mb-4" rows="3"></textarea>
                    <div class="flex justify-end gap-2">
                        <button @click="saveEdit" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Enregistrer</button>
                        <button @click="cancelEdit" class="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">Annuler</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Comment from '../components/Comment.vue';
import { fetchComments, addComment as apiAddComment, updateComment, deleteComment } from '../api/commentApi.js';
import { getUserByUuid } from '../api/userApi.js';

export default {
    name: 'ProfileView',
    components: { Comment },
    data() {
        return {
            user: null,
            comments: [],
            newComment: '',
            loadingComments: false,
            editingComment: null,
            editContent: '',
        };
    },
    async created() {
        const uuid = this.$route.path.split('/').pop();
        await this.fetchUserProfile(uuid);
        await this.fetchComments();
    },
    methods: {
        formatDate(date) {
            if (!date) return '';
            const d = new Date(date);
            return d.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
        },
        async fetchUserProfile(uuid) {
            try {
                this.user = await getUserByUuid(uuid);
            } catch (e) {
                this.user = null;
            }
        },
        async fetchComments() {
            this.loadingComments = true;
            try {
                if (!this.user) return;
                const comments = await fetchComments(this.user.uuid);
                this.comments = Array.isArray(comments) ? comments : [];
            } catch (e) {
                this.comments = [];
            }
            this.loadingComments = false;
        },
        async addComment() {
            if (!this.newComment.trim() || !this.user) return;
            const comment = {
                message: this.newComment,
                profile: this.user.uuid,
            };
            try {
                const newComment = await apiAddComment(comment);
                if (newComment) {
                    this.comments.unshift(newComment);
                    this.newComment = '';
                }
            } catch (e) {}
        },
        isAuthor(comment) {
            return comment.userIsAuthor;
        },
        editComment(comment) {
            this.editingComment = comment;
            this.editContent = comment.message;
        },
        async saveEdit() {
            if (!this.editContent.trim() || !this.editingComment) return;
            try {
                const updated = await updateComment(this.editingComment.uuid, this.editContent);
                if (updated) {
                    const idx = this.comments.findIndex(c => c.uuid === this.editingComment.uuid);
                    if (idx !== -1) this.comments[idx].message = this.editContent;
                }
            } catch (e) {}
            this.editingComment = null;
            this.editContent = '';
        },
        cancelEdit() {
            this.editingComment = null;
            this.editContent = '';
        },
        async deleteComment(commentUuid) {
            try {
                const deleted = await deleteComment(commentUuid);
                if (deleted) {
                    this.comments = this.comments.filter(c => c.uuid !== commentUuid);
                }
            } catch (e) {}
        },
    },
};
</script>
