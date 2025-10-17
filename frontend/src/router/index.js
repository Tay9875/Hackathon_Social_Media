import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import ProfileView from '../views/ProfileView.vue'
import Statistics from '@/views/Statistics.vue'
import { validateToken } from '@/api/tokenApi'

async function isAuthenticated() {
    return await validateToken(JSON.parse(localStorage.getItem('token')));
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: { requiresAuth: true },
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
            path: '/profile/:uuid',
            name: 'profile',
            component: ProfileView,
            meta: { requiresAuth: true },
        },
        {
            path: '/profile',
            name: 'my-profile',
            component: ProfileView,
            meta: { requiresAuth: true },
        },
        {
            path: '/statistics',
            name: 'statistics',
            component: Statistics,
            meta: { requiresAuth: true },
        },
        {
            path: '/logout',
            name: 'logout',
            beforeEnter(to, from, next) {
                localStorage.removeItem('token');
                next({ name: 'login' });
            }
        }
    ],
    scrollBehavior() {
        return { top: 0 }
    },
})

router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth && !await isAuthenticated()) {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router
