<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterLink to="/">Accueil</RouterLink>
  <RouterLink to="/login">Connexion</RouterLink>
  <RouterLink to="/signup">Inscription</RouterLink>
      
  <RouterView />
</template>

<style scoped>
</style>
