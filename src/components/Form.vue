<template>
<div class="ctn">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="活动名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="活动性质" prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
        <el-checkbox label="地推活动" name="type"></el-checkbox>
        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="活动形式" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="confirm" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button class="reset" @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</div>  
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        ruleForm: this.initFormData,
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
        sucess: false
      };
    },
    props:{
      initFormData: {
        type: Object,
        default: () => {
          {
            name: '';
            type: [];
            desc: ''
          }
        }
      }
    },
    watch: {
      initFormData: {
        handler(n, o){
          this.ruleForm = n
        },
        deep: true
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let url = 'http://rap2api.taobao.org/app/mock/233956/tbl-unit-test?name=' + this.ruleForm.name + '&nature=' + this.ruleForm.type.join(',') + '&form=' + this.ruleForm.form
            axios.get(url).then(res => {
              if (res.status === 200) {
                this.sucess = true
              } else {
                this.sucess= false
              }
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang='scss' scoped>
  .ctn{
    margin-top: 20px;
  }
</style>
