import MessageContainer from '@/components/MessageContainer'
import { mount } from '@vue/test-utils'

describe('MessageContainer', () => {
  it('Wraps MessageDisplay component', () => {
    const wrapper = mount(MessageContainer, {
      global: {
        stubs: {
          //use a stub, or fake placeholder version, of the child component
          MessageDisplay: {
            template: '<p data-testid="message">Hello from the db!</p>'
          }
        }
      }
    })

    const stubMessage = 'Hello from the db!'
    const message = wrapper.find('[data-testid="message"]').text()
    expect(message).toEqual(stubMessage)
  })
})

//stubs can create a coupling between the test and component’s implementation details
//since a stub is really just a placeholder for the child component, if that real component’s behavior changed, we may need to then update the stub accordingly;
//furthermore, since a stub isn’t the actual fully rendered component, you are reducing confidence of test results

//you can use also shallowMount for only mounting the top-level parent and not its children;
//it has the same disadvantages as stubs have: reduced confidence and increased coupling and maintenance
//also if you use other libraries that sit on top of Vue Test Utils, such as Vue Testing Library, you'll find that shallowMount isn't supported