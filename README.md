### 背景介绍：
以前写的公共组件，后来需要添加一些功能，添加了好几次，每次修改我都要测试好几遍保证以前的功能不受影响，有次我测试遗漏导致组件出现bug，而且由于是公共组件，我每次修改还得让其他小伙伴更新组件，很是麻烦，所以一定要写测试， 对自己负责，也是对他人负责！
### 前端测试介绍
1.单元测试（unit测试）
单元测试是把代码看成是一个个的组件，从而实现每一个组件的单独测试，测试内容主要是组件内每一个函数的返回结果是不是和期望值一样。
2.端到端测试（e2e测试） 
e2e测试是把我们的程序堪称是一个黑盒子，我不懂你内部是怎么实现的，我只负责打开浏览器，把测试内容在页面上输入一遍，看是不是我想要得到的结果。

两者的存在都是很有意义的：
>unit测试是程序员写好自己的逻辑后可以很容易的测试自己的逻辑返回的是不是都正确。 
e2e代码是测试所有的需求是不是都可以正确的完成，而且最终要的是在代码重构，js改动很多之后，需要对需求进行测试的时候测试代码是不需要改变的，你也不用担心在重构后不能达到客户的需求。

对于公共组件单元测试就可以满足基本需求了，本文也只讲单元测试。

### 单元测试的好处
- 减少bug
- 提高代码质量
- 快速定位问题，减少调试时间
- 单元测试还是一份很好的业务文档，每项测试的描述都可以体现业务逻辑
- 降低人工测试的成本，虽然编写及维护测试脚本需要付出额外的成本，但从长远来看，这些成本通常远比采用人工测试要低地多
- 保证该库在后续的开发维护过程中不会出现意料之外的问题；在修改代码「比如优化、重构、修改或添加新的功能等」后，往往需要重新进行测试，这时人工测试通常无法保证覆盖到每一个测试点，这时就会为项目带来隐患

不过不是所有的代码都要写单元测试，因为写单元测试也是有一定工作量的，对于更新频繁，变化较快的需求，让前端写测试，他估计会崩溃。但是对于公共组件，或者其他比较稳定的业务组件，单元测试是很有必要的。

### 采用 jest + Vue Test Utils进行单元测试的原因
1.Jest是 Facebook 的一套开源的 JavaScript 测试框架， 它自动集成了断言、JSDom、覆盖率报告等开发者所需要的所有测试工具，配置较少，对vue框架友好。

2.Vue Test Utils 是 Vue.js 官方的单元测试实用工具库，为jest和vue提供了一个桥梁，暴露出一些接口，让我们更加方便的通过Jest为Vue应用编写单元测试。

3.vue-cli 默认的单元测试也是使用的这套方案

对于不了解Vue Test Utils 的同学可以先看这里  [VueTestUtils](https://vue-test-utils.vuejs.org/zh/guides/#起步), 想了解Jest 的同学可以看这里 [Jest](https://jestjs.io/)

### 在现有项目中添加（Jest + Vue Test Utils）的测试环境
为了演示配置的过程， 我用`vue-cli` 初始化了一个简单的项目，`webpack` 是`4.0`的

项目代码地址： [点我](https://github.com/YalongYan/vue-test-utils-jest)

1.安装依赖
`npm i @vue/test-utils babel-jest jest  jest-serializer-vue  jest-transform-stub  vue-jest -D`
我的项目安装好如下：
![image.png](https://upload-images.jianshu.io/upload_images/8551758-99f7755da1b1a82d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2.修改.babelrc配置
在根目录的`.babelrc`中添加如下配置
```
"env": {
    "test": {
      "presets": ["env"]
    }
  }
```
就变成了如下（项目本身的配置不用改）
```
{
  "presets": [
    ["env", { "modules": false }]
  ],
  "env": {
    "test": {
      "presets": ["env"]
    }
  }
}
```
3.建立测试文件目录
在根目录下建立test目录，test里面再按照如下建立对应文件，文件夹，图上的红字是注释
![image.png](https://upload-images.jianshu.io/upload_images/8551758-8aaeae42614f1209.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

4.添加jest配置，`jest.conf.js`内容如下,相关属性的解释也写在了注释里
```
const path = require('path');

module.exports = {
    verbose: true,
    testURL: 'http://localhost/',
    rootDir: path.resolve(__dirname, '../../'),
    moduleFileExtensions: [
        'js',
        'json',
        'vue'
    ],
    moduleNameMapper: {
        '^@\/(.*?\.?(js|vue)?|)$': '<rootDir>/src/$1',   // @路径转换，例如：@/components/Main.vue -> rootDir/src/components/Main.vue
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/unit/__mocks__/fileMock.js', // 模拟加载静态文件
        '\\.(css|less|scss|sass)$': '<rootDir>/test/unit/__mocks__/styleMock.js'　　// 模拟加载样式文件   
    },
    testMatch: [ //匹配测试用例的文件
        '<rootDir>/test/unit/specs/*.spec.js'
    ],
    transform: {
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
        '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
    },
    testPathIgnorePatterns: [
        '<rootDir>/test/e2e'
    ],
    // setupFiles: ['<rootDir>/test/unit/setup'],
    snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
    coverageDirectory: '<rootDir>/test/unit/coverage', // 覆盖率报告的目录
    collectCoverageFrom: [ // 测试报告想要覆盖那些文件，目录，前面加！是避开这些文件
        // 'src/components/**/*.(js|vue)',
        'src/components/*.(vue)',
        '!src/main.js',
        '!src/router/index.js',
        '!**/node_modules/**'
    ]
}
```
备注： 
>单元测试的思想是单纯的测试组件，对于样式，图片等这些静态资源是不予测试的，所以上面的配置中才有了对这些静态资源进行了模拟加载，不然`Jest + Vue Test Util` 这俩哥们解析不了`scss, css, img.. `这些静态资源，测试就跑不起来了。
同时对于组件内引用的外部资源，也需要模拟，比如axios，下面的测试代码里面有处理的演示。

5.给测试添加`eslint`配置，`test/unit/` 目录下的`.eslintrc`内容如下
```
{
  "env": { 
    "jest": true
  }
}
```
6.`__mocks__ `文件目录下建立 `fileMock.js`,用来处理测试中遇到的静态资源， 内容就一行代码
```
module.exports = 'test-file-stub';
```
7. 在`specs`下写测试用例代码，像下图所示（组件名+spec）：

![image.png](https://upload-images.jianshu.io/upload_images/8551758-e2a6418442152477.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

8. 在`package.json` 的 `scripts` 里添加测试命令 
```
"unit": "jest --config test/unit/jest.conf.js --coverage"
```
执行 `npm run unit` 就可以启动测试了，测试完毕会产生类似下图的报告， 测试覆盖率，测试用例，镜像..都有

![image.png](https://upload-images.jianshu.io/upload_images/8551758-8e9ffb92ed15689f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 编写测试用例
先看下我演示的项目，如下

![image.png](https://upload-images.jianshu.io/upload_images/8551758-0aad2f9372bb3221.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

checkbox 开关控制图片的显隐
表单请求有验证，点击立即创建触发表单验证，验证通过提交表单；点击重置按钮去掉验证提示。

我的组件就两个

![image.png](https://upload-images.jianshu.io/upload_images/8551758-fc6089c603054a44.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

一个`Form.vue`  一个 `Main.vue`, 就对这俩个组件测试。

测试用例写了三个，如下

![image.png](https://upload-images.jianshu.io/upload_images/8551758-ca5731ce26b9558c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

里面详细的代码我就不贴出来了，可以去项目源码里面看。
下面说下写这几个测试用例需要注意的地方
1.由于项目用到了`element-ui` 所以在写测试用例的时候，也需要给模拟的`Vue(createLocalVue) install element-ui`
关键部分的代码如下：
```
import { mount, createLocalVue  } from '@vue/test-utils'
const localVue = createLocalVue()
import ElementUI from 'element-ui'
localVue.use(ElementUI)

import Form from '@/components/Form'

// 测试表单请求
describe('Test Form Request', () => {
  it('Form Request Sucess', () => {
    let wrapper = mount(Form, {
      stubs: {
        transition: false
      },
      localVue
    })
  })
})
```
2.`checkbox`切换的时候，控制图片显示/隐藏，需要用nextTick
```
it('show switch img', () => {
    wrapper.setData({ switchvalue: true })
    // 修改完数据 dom操作没同步 需要用 nextTick
    return Vue.nextTick().then(function() {
      expect(wrapper.findAll('.logoImg').length).toBe(1)
    })
  })
```
3.模拟`axios`
为什么要模拟axios ?
>因为Jest + Vue Test Utils这套环境中是没有  `axios`的，所以他不认 `axios`， 但是组件代码里面确实调用了`axios`, 那么我们就需要模拟一个 `axios` 出来

新建  `axios.js` 文件

![image.png](https://upload-images.jianshu.io/upload_images/8551758-2d263c1d4d7cd165.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

`axios.js` 的内容如下:
```
module.exports = {
    get: jest.fn(() => Promise.resolve({ status: 200 }))
}
```
我这里只用到了 `status: 200`，大家根据自己需求设置返回的数据。
测试用例代码如下：
```
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
```
以上介绍了单元测试，以及如何在现有项目基础上添加测试的配置，并写了几个测试用例，应该可以让不了解单元测试的同学入门了，更高级点的可以看 [这里](https://github.com/sagalbot/vue-select) 这个项目里面的单元测试就比较全面，大家可以参考下。

演示项目代码： [https://github.com/YalongYan/vue-test-utils-jest](https://github.com/YalongYan/vue-test-utils-jest)

参考连接：
[Vue Test Utils](https://vue-test-utils.vuejs.org/zh/guides/)

[Jest Using With Wbpack](https://jestjs.io/docs/zh-Hans/webpack#%E5%A4%84%E7%90%86%E9%9D%99%E6%80%81%E6%96%87%E4%BB%B6)

[使用jest对vue项目进行单元测试](https://segmentfault.com/a/1190000016299936)

 [ui组件如何进行单元测试](https://segmentfault.com/q/1010000006970956)

[Jest Mock](https://blog.csdn.net/sinat_33312523/article/details/82970655)

[用Jest测试Vue中的Methods中的方法和Mock依赖](https://www.jianshu.com/p/41eadb6409ba)
