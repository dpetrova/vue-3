import { h } from 'vue'

const App = {    
  render() {
    return this.list.map(item => {
        return h('div', {key: item.key}, item.text)
    })
  }
}