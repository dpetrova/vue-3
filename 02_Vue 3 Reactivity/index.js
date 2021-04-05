
/* BUILDING VUE 3 REACTIVITY SYSTMEM */

//targetMap stores the effects that each reactive object should re-run when it's updated
//here we store the dependencies associated with each reactive object (WeakMap is a collection of key/value pairs in which the keys must be objects and the values can be arbitrary values)
const targetMap = new WeakMap()

//the active effect running
let activeEffect = null 


function track(target, key) {
  if (activeEffect) { 
    //make sure this effect is being tracked
    let depsMap = targetMap.get(target) //get the current depsMap for this target
    if (!depsMap) {
        //there is no map
        targetMap.set(target, (depsMap = new Map())) //create a map to store the dependencies for each property
    }

    //make sure this effect is being tracked
    let dep = depsMap.get(key) //get the current dep (effects) that need to be run when this key (property) is set
    if (!dep) {
        //there is no dep (effects) on this key yet
        depsMap.set(key, (dep = new Set())) //create a new dependency which is a set of effects that should get re-run when values change
    }

    dep.add(activeEffect) //add effect to dependency map
  }
}


function trigger(target, key) {
  const depsMap = targetMap.get(target) //does this object have any properties that have dependencies (effects)
  if (!depsMap) {
    return
  }

  let dep = depsMap.get(key) //get the dependencies (effects) associated with this key
  if (dep) { //if they exist
    dep.forEach(effect => {      
      effect() // run them all
    })
  }
}


function reactive(target) {  
  //a Proxy is a placeholder for another object, which by default delegates to the object
  //first parameter is target, second is a handler and can be used to define custom behavior on the proxy object, like intercepting get and set calls (interceptor methods are called traps)
  return new Proxy( target, {
    get(target, key, receiver) {  
      //console.log('Get was called with key = ' + key)      
      let result = Reflect.get(target, key, receiver) //Reflect allows you to get/set a property on an object
      //Track
      track(target, key)
      return result
    },
    set(target, key, value, receiver) {
      //console.log('Set was called with key = ' + key + ' and value = ' + value)
      let oldValue = target[key]
      let result = Reflect.set(target, key, value, receiver)
      if (oldValue != result) { //оnly if the value changes 
        //Trigger
        trigger(target, key)
      } 
      return result
    }
  })
}


function effect(eff) {  
  activeEffect = eff  //set this as the activeEffect  
  activeEffect() //run it
  activeEffect = null //unset it
}

//define ref
//1.using reactive function
// function ref(intialValue) {
//   return reactive({ value: initialValue })
// }
//2.using Object Accessors (functions that get or set a value)
function ref(raw) {
  const r = {
    get value() {
      track(r, 'value')
      return raw
    },
    set value(newVal) {
      raw = newVal
      trigger(r, 'value')
    },
  }

  return r
}


function computed(getter) {
  let result = ref()  //create a new reactive reference 
  effect(() => (result.value = getter())) //run the getter in an effect() which sets the result.value
  return result // return the reactive reference  
}


let product = reactive({ price: 5, quantity: 2 }) // <-- Returns a proxy object
let salePrice = computed(() => {
  return product.price * 0.9
})
let total = computed(() => {
  return salePrice.value * product.quantity
})

let user = reactive({firstName: 'Pesho', lastName: 'Petrov', role: 'admin'})
let fullName = computed(() => {
  return user.firstName + " " + user.lastName
})
let isAuthorized = computed(() => {
  return user.role === 'admin'
})

//initially product and user properties
console.log("Sale price: ", salePrice.value) // --> 4.5
console.log("Total: ", total.value) // --> 9
console.log("Full name: ", fullName.value) // --> Pesho Petrov
console.log("Authorized: ", isAuthorized.value) // --> true

//change product properties
product.quantity = 3
console.log("Total: ", total.value) // --> 13.5
product.price = 10
console.log("Sale price: ", salePrice.value) // --> 9
console.log("Total: ", total.value) // --> 27

//change user properties
user.firstName = 'Mincho'
user.role = 'editor'
console.log("Full name: ", fullName.value) // --> Mincho Petrov
console.log("Authorized: ", isAuthorized.value) // --> false

//we can add new reactive properties
product.name = 'Shoes'
effect(() => {
  console.log(`Product name is now ${product.name}`)
})
product.name = 'Socks'