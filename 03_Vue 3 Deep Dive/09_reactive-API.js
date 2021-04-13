let activeEffect

class Dep {
    subscribers = new Set()    

    depend(){        
        if(activeEffect){
            this.subscribers.add(activeEffect)
        }
    }
    notify() {
        this.subscribers.forEach(effect => {
            effect()
        })
    }
}

function watchEffect(effect) {
  activeEffect = effect
  effect() //run effect
  activeEffect = null
}

/*reactivity using defineProperty -> problem here is that only initial object's properties are reactive, but new added properties are not reactive
function reactive(raw) {
    Object.keys(raw).forEach(key => {
        const dep = new Dep()
        let value = raw[key]

        Object.defineProperty(raw, key, {
            get(){
                dep.depend()
                return value
            },
            set(newValue){
                value = newValue
                dep.notify()
            }
        })
    })

    return raw
}
*/

/* reactivity using Proxies */
const targetMap = new WeakMap()

function getDep(target, key) {
    let depsMap = targetMap.get(target)
    if(!depsMap){
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }

    let dep = depsMap.get(key)
    if(!dep){
        dep = new Dep()
        depsMap.set(key, dep)
    }

    return dep
}

const reactiveHandlers = {
    get(target, key, receiver) {
        const dep = getDep(target, key)
        dep.depend()
        //return target[key]
        return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
        const dep = getDep(target, key)
        const result = Reflect.set(target, key, value, receiver)
        dep.notify()
        return result
    },
    has() {
        //it is triggered in operations like: console.log('msg' in state)
    },
    ownKeys() {
        //it is triggered when use Object.keys(state)
    }
}

function reactive(raw) {
    return new Proxy(raw, reactiveHandlers)
}

/* end of reactivity using Proxies */


const state = reactive({
    count: 0
})

watchEffect(() => {    
    console.log(state.count) //0
    console.log(state.msg) //undefined
})


state.count++ //1

state.msg = 'hello' //add new property -> it becape automatically reactive
