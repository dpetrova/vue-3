import LoginForm from '@/components/LoginForm.vue'
import { mount } from '@vue/test-utils'

describe('LoginForm', () => {
  it('emits an event with user data payload', () => {
    const wrapper = mount(LoginForm)

    // 1. Find text input
    //const input = wrapper.find('input[type="text"]') // find by css selector
    const input = wrapper.find('[data-testid="name-input"]') // find by attribute
    // 2. Set value for text input
    input.setValue('Adam Jahr')
    // 3. Simulate form submission
    wrapper.trigger('submit')
    // 4. Assert event has been emitted
    const formSubmittedCalls = wrapper.emitted('formSubmitted') //use Vue Test Utils emitted API to store any calls of the formSubmitted event
    console.log(formSubmittedCalls) //  [ [ { name: 'Adam Jahr' } ] ]
    expect(formSubmittedCalls).toHaveLength(1) //check if the event was indeed emitted
    // 5. Assert payload is correct
    const expectedPayload = { name: 'Adam Jahr' }
    const actualpayload = formSubmittedCalls[0][0] //target the payload itself in formSubmittedCalls array
    expect(actualpayload).toMatchObject(expectedPayload) //assert two obects matching
  })
})
