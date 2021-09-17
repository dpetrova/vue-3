import MessageDisplay from '@/components/MessageDisplay'
import { mount } from '@vue/test-utils'
import { getMessage } from '@/services/axios' //import getMessage function from axios.js file
import flushPromises from 'flush-promises'

//mock axios API call, using Jest’s mock function, as passing the path for where our API call function lives
//when we call getMessage within our tests, we’re actually calling the mocked version of that function, not the actual one
jest.mock('@/services/axios')

//clearing all of our mocks, which will reset the number of times mocked function been called
beforeEach(() => {
  jest.clearAllMocks()
})

describe('MessageDisplay', () => {
  it('Calls getMessage once and displays message', async () => {
    const mockMessage = 'Hello from the db'

    //pretending to call our mocked API call getMessage function and returning a mocked value for the call to resolve with
    getMessage.mockResolvedValueOnce({ text: mockMessage })

    const wrapper = mount(MessageDisplay)

    //use flush-promises library to wait for the promise that our mocked call returns to resolve, otherwise, our tests would run before the promise is resolved, and fail
    await flushPromises()

    //check that call happened once, and ensured that we aren’t accidentally hitting our server more times than we should be
    expect(getMessage).toHaveBeenCalledTimes(1)

    //check that component displays message
    const message = wrapper.find('[data-testid="message"]').text()
    expect(message).toEqual(mockMessage)
  })

  it('Displays an error when getMessage call fails', async () => {
    const mockError = 'Oops! Something went wrong.'

    //use mockRejectedValueOnce to simulate the rejected/failed request, and we’re passing the mockError for it to resolve with
    getMessage.mockRejectedValueOnce(mockError)

    const wrapper = mount(MessageDisplay)
    await flushPromises()

    //make sure we’re not making the API call more than once
    expect(getMessage).toHaveBeenCalledTimes(1)

    //check that component displays error
    const displayedError = wrapper.find('[data-testid="message-error"]').text()
    expect(displayedError).toEqual(mockError)
  })
})
