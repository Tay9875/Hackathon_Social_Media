<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <nav class="fixed top-0 left-0 w-full z-10 flex items-center justify-between px-6 py-3 bg-white bg-opacity-80 backdrop-blur-lg border-b border-gray-200">
        <div class="flex items-center gap-4">
            <RouterLink class="font-semibold text-gray-800 hover:text-blue-600 transition-colors" to="/">Accueil</RouterLink>
            <RouterLink class="font-semibold text-gray-800 hover:text-blue-600 transition-colors" to="/login">Connexion</RouterLink>
            <RouterLink class="font-semibold text-gray-800 hover:text-blue-600 transition-colors" to="/signup">Inscription</RouterLink>
            <RouterLink class="font-semibold text-gray-800 hover:text-blue-600 transition-colors" to="/statistics">Statistics</RouterLink>
        </div>
    </nav>
</template>