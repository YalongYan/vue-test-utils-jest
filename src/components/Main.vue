<template>
  <div class="container">
    <h3> 随便测测</h3>
    <el-switch
      v-model="switchvalue"
      active-color="#13ce66"
      inactive-color="#ff4949">
    </el-switch>
    <img :src="logoImg" v-if="switchvalue" class="logoImg">
    <Select ref="select"/>
    <div class="line"></div>
    <h3> 表单请求：</h3>
    <Form ref='form'/>
  </div>
</template>

<script>
import Form from './Form'
import Select from './Select'
import logoImg from './../assets/logo.png'

export default {
  data () {
    return {
      switchvalue: true,
      logoImg: logoImg
    }
  },
  components: {
    Form,
    Select
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
