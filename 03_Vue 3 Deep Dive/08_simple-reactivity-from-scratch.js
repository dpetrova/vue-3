let activeEffect

class Dep {
    constructor(value) {
        this.subscribers = new Set()
        this._value = value
    }

    //object accessors    
    get value(){
        this.depend() //when access value, we track effect
        return this._value
    }
    set value(newValue){
        this._value = newValue
        this.notify() //when mutate the value, we rerun effect automatically
    }

    depend(){
        //if acctive effect -> track it
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

const dep = new Dep('hello')

watchEffect(() => {  
  console.log(`${dep.value} effect run`)
})

dep.value = 'changed'
