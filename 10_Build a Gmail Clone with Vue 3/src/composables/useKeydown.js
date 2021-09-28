import { onBeforeUnmount } from 'vue';

//this approach wull register on.keydown for every use of useKeydown()
// export const useKeydown = function(keyPressed, fn) {
//   let onkey = function(event) {    
//     if(event.key === keyPressed) {
//       fn()
//     }
//   }

//   window.addEventListener('keydown', onkey);

//   //remove the eventListener in onBeforeUnmount hook -> this hook will be called every time we unmount the modal, removing the event listener
//   onBeforeUnmount(()=> {
//     window.removeEventListener('keydown', onkey);
//   })
// }

//this approach will register on.keydown only once as register multiple shortcuts with just one instance of useKeydown
export const useKeydown = function(keyCombos) {
  let onKeyDown = function(event) {
    let kc = keyCombos.find(({key, fn}) => key == event.key ) //find particular keyCombo by event.key
    if(kc) {
      kc.fn() //call the function associated with found keyCombo
    }
  }

  window.addEventListener('keydown', onKeyDown);

  //remove the eventListener in onBeforeUnmount hook -> this hook will be called every time we unmount the modal, removing the event listener
  onBeforeUnmount(()=> {
    window.removeEventListener('keydown', onKeyDown);
  })
}

//exports the useKeydown function, which takes one argument (array of keyCombo objects {key: 'Escape', fn: () => {...}}), 
//find the needed keyCombo by event.key, and call the function associated with it
export default useKeydown;
