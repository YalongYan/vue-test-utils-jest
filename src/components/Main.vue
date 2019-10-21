<template>
  <div class="container">
    <h3> 图片显隐控制</h3>
    <el-switch
      v-model="switchvalue"
      active-color="#13ce66"
      inactive-color="#ff4949">
    </el-switch>
    <span v-if="switchvalue" class="imgContainer"><img :src="logoImg" class="logoImg"> </span>
    <div class="line"></div>
    <h3> 表单请求：</h3>
    <Form ref='form' :initFormData='initFormData' />
  </div>
</template>

<script>
import Form from './Form'
import logoImg from './../assets/logo.png'

export default {
  data () {
    return {
      switchvalue: true,
      logoImg: logoImg,
      initFormData: {
        name: '团建',
        type: [],
        desc: ''
      }
    }
  },
  components: {
    Form
  }
}
</script>

<style lang="scss">
.container {
  padding: 20px;

  .logoImg{
    width: 23px;
    vertical-align: middle;
  }
  .line{
    display: inline-block;
    width: 100%;
    height: 0px;
    border: 1px solid #3b3a3a;
  }
}
</style>
