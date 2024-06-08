<script setup>
const authCookie = useCookie('pokemon-auth');

function authenticate() {
  authCookie.value = '1f38d';
}

function logout() {
  authCookie.value = null;
}
</script>

<template>
  <h1>Login Page</h1>
  <button @click="authenticate">Authenticate</button>
  <button @click="logout">Logout</button>
</template>
