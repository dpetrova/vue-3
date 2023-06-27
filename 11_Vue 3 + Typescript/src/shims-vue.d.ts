//a helper file for TypeScript to give a better definition of what’s going on with .vue files
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
