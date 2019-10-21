import { mount, createLocalVue  } from '@vue/test-utils'
import Vue from 'vue'
const localVue = createLocalVue()
import ElementUI from 'element-ui'
localVue.use(ElementUI)

import Main from '@/components/Main'
const wrapper = mount(Main, {
  // 加stubs 参数是为了避免这个问题  https://github.com/vuejs/vue-test-utils/issues/958
  stubs: {
    transition: false
  },
  localVue
})

describe('Test Img Display', () => {
  it('show switch img', () => {
    wrapper.setData({ switchvalue: true })
    // 修改完数据 dom操作没同步 需要用 nextTick
    return Vue.nextTick().then(function() {
      expect(wrapper.findAll('.logoImg').length).toBe(1)
    })
  })
  it('hide switch img', () => {
    wrapper.setData({ switchvalue: false })
    return Vue.nextTick().then(function() {
      expect(wrapper.findAll('.logoImg').length).toBe(0)
    })
  })
})
