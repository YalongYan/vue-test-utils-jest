import { mount, createLocalVue  } from '@vue/test-utils'
import Vue from 'vue'
const localVue = createLocalVue()
import ElementUI from 'element-ui'
localVue.use(ElementUI)
import axios from 'axios'

import Form from '@/components/Form'

// 测试表单请求
describe('Test Form Request', () => {
  it('Form Request Sucess', () => {
    let wrapper = mount(Form, {
      stubs: {
        transition: false
      },
      localVue,
      propsData: {
        initFormData: {
          name: '一起团建',
          type: ['地推活动'],
          desc: '吃喝玩乐'
        }
      }
    })
    wrapper.find('.confirm').trigger('click')
    return Vue.nextTick().then(function() {
        expect(wrapper.vm.sucess).toBe(true)
        let url = 'http://rap2api.taobao.org/app/mock/233956/tbl-unit-test?name=' + wrapper.vm.ruleForm.name + '&nature=' + wrapper.vm.ruleForm.type.join(',') + '&form=' + wrapper.vm.ruleForm.form
        expect(axios.get).toBeCalledWith(url)
    })
  })
})
