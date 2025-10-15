import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import ProfileView from '../views/ProfileView.vue'
import EditProfileView from '../views/EditProfileView.vue'

function isAuthenticated() {
    return !!localStorage.getItem('token');
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            // meta: { requiresAuth: true },
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignupView,
        },
        {
            path: '/profile/:username',
            name: 'profile',
            component: ProfileView,
            // meta: { requiresAuth: true },
        },
        {
            path: '/profile/:username/edit',
            name: 'profile-edit',
            component: EditProfileView,
            // meta: { requiresAuth: true },
        }
    ],
    scrollBehavior() {
        return { top: 0 }
    },
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated()) {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router
