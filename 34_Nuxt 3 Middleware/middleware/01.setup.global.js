export default defineNuxtRouteMiddleware(async (to, from) => {
  /* error handling using abortNavigation */
  // try {
  //   const data = await fetch('/api/this-path');
  //   return navigateTo('/profile' + data.user.name);
  // } catch (error) {
  //   return abortNavigation(error);
  // }
  /* error handling using createError */
  // if (to.path === '/login') {
  //   throw createError({
  //     statusCode: 405,
  //     statusMessage: 'Oh snap it broke!',
  //   });
  // }
});
