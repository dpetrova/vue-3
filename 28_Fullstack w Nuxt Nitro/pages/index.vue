<template>
  <h1>Hello</h1>
  <!-- all pokemons -->
  <pre v-if="pokemons">{{ pokemons }}</pre>
  <div v-else>{{ error }}</div>
  <!-- scizor -->
  <ul>
    <li><img :src="scizor.sprite" :lat="scizor.name" /></li>
    <li>{{ scizor.id }}: {{ scizor.name }}</li>
  </ul>
  <!-- pikachu -->
  <ul>
    <li><img :src="pikachu.sprite" :lat="pikachu.name" /></li>
    <li>{{ pikachu.id }}: {{ pikachu.name }}</li>
  </ul>
</template>

<script setup>
// const data = await fetch('https://pokeapi.co/api/v2/pokemon/scizor').then(
//   res => res.json()
// )

// const { data } = await useAsyncData('scizor', () => {
//   return $fetch('https://pokeapi.co/api/v2/pokemon/scizor');
// });

// const { data } = await useFetch('https://pokeapi.co/api/v2/pokemon/scizor');

const { data: pokemons, error } = await useFetch('/api/pokemons');
const { data: scizor } = await useFetch('/api/scizor');
const { data: pikachu } = await useFetch('/api/pikachu');
</script>
