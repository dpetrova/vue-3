import { h } from 'vue'

const App = {    
  render() {
    const slot = this.$slots.default 
      ? this.$slots.default()
      : []

    //return h('div', slot) 

    // slot.map(vnode => {
    //   return h('div', [vnode])
    // }) 

    return h('div', {class: 'stack'}, slot.map(child => {
      return h('div', {class: `mt-${this.props.size}`}, [
        child
      ])
    }))

  }                           
}

    // <Stack size="4">                  <div class="stack">
    //   <div>hello</div>                  <div class="mt-4">
    //   <Stack size="4">                    <div>hello</div>
    //     <div>hello</div>    --->        </div>
    //     <div>hello</div>                <div class="mt-4">
    //   </Stack>                            <div class="stack">
    // </Stack>                                <div class="mt-4">
    //                                           <div>hello</div>
    //                                           <div>hello</div>
    //                                         </div>
    //                                       </div>
    //                                     </div>
    //                                   </div>
