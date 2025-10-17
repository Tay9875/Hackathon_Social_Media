<template>
    <div class="max-w-4xl mx-auto my-12 p-6 bg-gray-50 rounded-2xl shadow-lg">
        <div class="bg-white rounded-xl shadow-inner p-6 md:flex md:items-center md:gap-6">
            <div class="flex-shrink-0">
                <img
                    :src="user && user.avatar ? user.avatar : 'https://randomuser.me/api/portraits/lego/1.jpg'"
                    alt="Avatar"
                    class="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white shadow-sm object-cover"
                />
            </div>

            <div class="mt-4 md:mt-0 flex-1">
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <h1 class="text-2xl md:text-3xl font-extrabold text-gray-800">
                            {{ user ? (user.firstName + ' ' + user.lastName) : 'Profil' }}
                        </h1>
                        <p class="text-sm text-gray-500 mt-1">{{ user ? user.email : '' }}</p>

                        <div class="mt-3 flex flex-wrap items-center gap-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.53 0 4.887.67 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                Profil
                            </span>

                            <span v-if="user && user.gender" class="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium">
                                {{ user.gender }}
                            </span>

                            <span v-if="user && user.birthDate" class="inline-flex items-center px-3 py-1 rounded-full bg-yellow-50 text-yellow-800 text-sm font-medium">
                                {{ formatDate(user.birthDate) }}
                            </span>

                            <span v-if="isOwnProfile" class="inline-flex items-center px-3 py-1 rounded-full bg-indigo-600 text-white text-sm font-medium">
                                You
                            </span>
                        </div>
                    </div>

                    <div class="flex items-center gap-3">
                        <div class="hidden sm:block text-right">
                            <div class="text-xs text-gray-500">Comments</div>
                            <div class="text-lg font-semibold text-gray-800">{{ comments ? comments.length : 0 }}</div>
                        </div>

                        <div>
                            <button
                                v-if="isOwnProfile"
                                @click="startEditProfile"
                                class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z"></path></svg>
                                Edit Profile
                            </button>
                            <div v-else class="text-sm text-gray-500">Visitor</div>
                        </div>
                    </div>
                </div>

                <div class="mt-4 grid grid-cols-1 gap-3 text-sm text-gray-700">
                    <div class="flex items-start gap-3">
                        <svg class="w-5 h-5 mt-1 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 21s-6-4.5-6-10.5a6 6 0 1112 0C18 16.5 12 21 12 21z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"></path>
                        </svg>
                        <div class="text-left">
                            <div class="text-xs text-gray-500">Address</div>
                            <div class="font-medium">{{ user && user.address ? user.address : 'Not provided' }}</div>
                        </div>
                    </div>

                    <div class="flex items-start gap-3">
                        <svg class="w-5 h-5 mt-1 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8a9 9 0 110-18 9 9 0 010 18z"></path></svg>
                        <div class="text-left">
                            <div class="text-xs text-gray-500">About</div>
                            <div class="font-medium">{{ user && user.description ? user.description : 'No description' }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Comments section -->
        <div class="mt-8">
            <div class="flex items-center justify-between">
                <h2 class="text-lg font-bold text-gray-800">Comments</h2>
                <span class="text-sm text-gray-500">{{ comments ? comments.length : 0 }} total</span>
            </div>


            <AddComment
                v-if="user"
                :userUuid="user.uuid"
                @comment-added="handleCommentAdded"
            />

            <div class="mt-6 space-y-4">
                <div v-if="comments && comments.length">
                    <div v-for="comment in comments" :key="comment.uuid" class="group relative">
                        <Comment
                            :author="comment.createdBy"
                            :content="comment.message"
                            :createdAt="comment.createdAt"
                        />
                        <div class="absolute right-2 top-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition ml-14 mt-2">
                            <button v-if="isAuthor(comment)" @click="editComment(comment)" class="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200">Modifier</button>
                            <button v-if="isAuthor(comment)" @click="deleteComment(comment.uuid)" class="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700">Supprimer</button>
                        </div>
                    </div>
                </div>
                <div v-else class="text-center text-gray-400 py-8">
                    No comments yet. Be the first to comment!
                </div>
            </div>
        </div>

        <!-- Modal édition commentaire -->
        <div v-if="editingComment" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div class="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg">
                <h3 class="text-lg font-semibold text-gray-800">Edit Comment</h3>
                <textarea v-model="editContent" class="mt-3 w-full border border-gray-200 rounded-md p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-indigo-200"></textarea>
                <div class="mt-4 flex justify-end gap-3">
                    <button @click="cancelEdit" class="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">Cancel</button>
                    <button @click="saveEdit" class="px-4 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600">Save</button>
                </div>
            </div>
        </div>

        <!-- Modal édition profil -->
        <div v-if="editingProfile" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div class="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-xl">
                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-semibold">Edit Profile</h3>
                    <button @click="cancelProfileEdit" class="text-gray-500 hover:text-gray-700">Close</button>
                </div>

                <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input v-model="profileDraft.firstName" placeholder="First Name" class="border border-gray-200 rounded-md px-3 py-2 focus:outline-none" />
                    <input v-model="profileDraft.lastName" placeholder="Last Name" class="border border-gray-200 rounded-md px-3 py-2 focus:outline-none" />
                    <input v-model="profileDraft.email" placeholder="Email" class="border border-gray-200 rounded-md px-3 py-2 focus:outline-none col-span-1 md:col-span-2" />
                    <input v-model="profileDraft.address" placeholder="Address" class="border border-gray-200 rounded-md px-3 py-2 focus:outline-none col-span-1 md:col-span-2" />
                    <input v-model="profileDraft.avatar" placeholder="Avatar URL" class="border border-gray-200 rounded-md px-3 py-2 focus:outline-none col-span-1 md:col-span-2" />
                    <textarea v-model="profileDraft.description" placeholder="Description" class="border border-gray-200 rounded-md px-3 py-2 focus:outline-none col-span-1 md:col-span-2"></textarea>
                </div>

                <div class="mt-6 flex justify-end gap-3">
                    <button @click="cancelProfileEdit" class="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">Cancel</button>
                    <button @click="saveProfile" class="px-4 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Comment from '../components/Comment.vue';
import AddComment from '../components/AddComment.vue';
import { fetchComments, addComment as apiAddComment, updateComment, deleteComment } from '../api/commentApi.js';
import { getUserByUuid, getCurrentUser, updateUser } from '../api/userApi.js';

export default {
    name: 'ProfileView',
    components: { Comment, AddComment },
    data() {
        return {
            user: null,
            isOwnProfile: false,
            comments: [],
            // newComment: '',
            loadingComments: false,
            editingComment: null,
            editContent: '',
            editingProfile: false,
            profileDraft: null,
        };
    },
    async created() {
        await this.initProfile();
    },
    methods: {
        async initProfile() {
            this.isOwnProfile = false;
            let uuid = this.$route && this.$route.params ? this.$route.params.uuid : null;

            if (!uuid) {
                try {
                    const me = await getCurrentUser();
                    if (me && me.uuid) {
                        uuid = me.uuid;
                        this.isOwnProfile = true;
                    }
                } catch (e) {
                    uuid = null;
                }
            }

            await this.fetchUserProfile(uuid);
            await this.fetchComments();
        },

        beforeRouteUpdate(to, from, next) {
            this.$nextTick(async () => {
                try {
                    await this.initProfile();
                } catch (e) {
                    // ignore
                }
                next();
            });
        },

        formatDate(date) {
            if (!date) return '';
            const d = new Date(date);
            return d.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
        },
        async fetchUserProfile(uuid) {
            try {
                if (!uuid && !this.isOwnProfile) {
                    this.user = null;
                    return;
                }

                if (this.isOwnProfile) {
                    this.user = await getCurrentUser();
                } else {
                    this.user = await getUserByUuid(uuid);
                }

                if (this.isOwnProfile && this.user) {
                    this.profileDraft = { ...this.user };
                }
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
        handleCommentAdded(newComment) {
            if (newComment) {
                this.comments.unshift(newComment);
            }
        },
        isAuthor(comment) {
            return comment.userIsAuthor;
        },
        startEditProfile() {
            this.editingProfile = true;
            this.profileDraft = { ...this.user };
        },
        cancelProfileEdit() {
            this.editingProfile = false;
            this.profileDraft = this.user ? { ...this.user } : null;
        },
        async saveProfile() {
            if (!this.profileDraft || !this.user) return;
            try {
                const updated = await updateUser(this.user.uuid, this.profileDraft);
                if (updated) {
                    this.user = { ...this.profileDraft };
                    this.editingProfile = false;
                }
            } catch (e) {
                console.error(e);
            }
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
    watch: {
        '$route'(to, from) {
            if (to.fullPath === from.fullPath) return;
            this.initProfile().catch(() => {});
        },
    },
};
</script>
