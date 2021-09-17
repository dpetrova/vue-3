import AppHeader from '@/components/AppHeader'
import { mount } from '@vue/test-utils'

//group related tests
describe('AppHeader', () => {
  test('if user is not logged in, do not show logout button', () => {
    // mounting the component
    const wrapper = mount(AppHeader)
    //find() method will search through our template for a matching selector
    //isVisible() will return a boolean, depending on element is visible/or not in our component
    expect(wrapper.find('button').isVisible()).toBe(false)
  })

  test('if logged in, show logout button', async () => {
    const wrapper = mount(AppHeader)
    //setData returns a promise that must be awaited to ensure that Vue updates the DOM before you make an assertion
    await wrapper.setData({ loggedIn: true })
    expect(wrapper.find('button').isVisible()).toBe(true)
  })
})
