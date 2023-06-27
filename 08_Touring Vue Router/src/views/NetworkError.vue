<template>
  <div class="networkError">
    <h1>Uh-Oh!</h1>
    <!-- push the user back to the previous page when triggered the network error -->
    <h3>
      It looks like you're experiencing some network issues, please take a
      breath and <a href="#" @click="$router.go(-1)">click here</a> to try
      again.
    </h3>
  </div>
</template>
