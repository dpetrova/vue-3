import { h } from 'vue'

const App = {    
    render() {
        return h('div', {
          id: 'hello'
        }, [
          h('span', 'world')
        ])
    }
}

// const vdom = {
//     tag: 'div',
//     id: 'hello',
//     children: [
//         {
//             tag: 'span',
//             children: ['world']
//         }
//     ]
// }

// <div id="hello"><span>world</span></div>