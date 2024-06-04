export default defineNuxtRouteMiddleware((to, from) => {
  console.log('---------Analytics global middleware--------');
  console.log('from:', from);
  console.log('to:', to);
});
