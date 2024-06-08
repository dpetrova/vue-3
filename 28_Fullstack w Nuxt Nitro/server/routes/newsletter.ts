export default defineEventHandler(event => {
    return sendRedirect(event, 'https://www.vuemastery.com/dashboard/articles', 302)
  })