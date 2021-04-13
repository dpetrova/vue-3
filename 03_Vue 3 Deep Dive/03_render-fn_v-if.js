import { h } from 'vue'

const App = {
    //using ternary    
    render() {
        return this.ok 
            ? h('div', {id: 'hello'}, [ h('span', 'world') ])
            : h('p', 'other branch')
    },

    //using nested ternary    
    render() {
        return this.ok 
            ? h('div', {id: 'hello'}, [ h('span', 'world') ])
            : this.otherCondition
                ? h('p', 'other branch')
                : h('span')
    },

    //using if-else
    render() {
        let nodeToReturn
        if(this.ok) {
            nodeToReturn = h('div', {id: 'hello'}, [ h('span', 'world') ])
        } else if (this.otherCondition) {
            nodeToReturn = h('p', 'other branch')
        } else {
            nodeToReturn = h('span')
        }

        return nodeToReturn
    }
}
