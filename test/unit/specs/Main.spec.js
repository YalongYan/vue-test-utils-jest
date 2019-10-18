import { mount, createLocalVue  } from '@vue/test-utils'

const localVue = createLocalVue()
import ElementUI from 'element-ui'
localVue.use(ElementUI)

import Main from '@/components/Main'

describe('header.vue', () => {
  it('should render correct contents', () => {
    const Constructor = mount(Main, {
      // 加stubs 参数是为了避免这个问题  https://github.com/vuejs/vue-test-utils/issues/958
      stubs: {
        transition: false
      },
      localVue
    })
    console.log(Constructor.vm.$refs.select.value)
    expect('Welcome to Your Vue.js App')
      .toEqual('Welcome to Your Vue.js App')
  })
})
