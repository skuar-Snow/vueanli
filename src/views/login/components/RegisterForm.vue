<script setup>
import { reactive, ref } from 'vue'
import { Lock, User,Message } from '@element-plus/icons-vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const emits = defineEmits(['change'])
const router = useRouter()
const formRef = ref(null)
const loading = ref(false)
const form1 = ref({
  username: '',
  password: '',
  email:'',
  checkword:'',
})
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '用户名长度在3 - 10位', trigger: 'change' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  checkword: [
  { required: true, message: '请再次输入密码', trigger: 'blur' },
  { validator: (rule, value, callback) => {
    if (value !== form1.value.password) {
      callback(new Error('两次输入的密码不一致!'));
      } else {
        callback();
      }
    }, trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
})

const submit = async () => {
  await formRef.value.validate()
  loading.value = true
  const res = await axios.post('http://121.89.213.194:9001/api/register', form1.value)
  loading.value = false
  if (res.data.code === 0) {
    ElMessage.success('注册成功！')
    emits('change')
  } else {
    ElMessage.error(res.data.msg)
  }
}

</script>

<template>
   <div class="form">
    <h2>注册</h2>
    <el-form
      ref="formRef"
      :model="form1"
      :rules="rules"
    >
      <el-form-item prop="username">
        <el-input v-model="form1.username" placeholder="请输入用户名" :prefix-icon="User" />
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="form1.email" placeholder="请输入邮箱" :prefix-icon="Message" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form1.password" show-password placeholder="请输入密码" :prefix-icon="Lock" />
      </el-form-item>
      <el-form-item prop="checkword">
        <el-input v-model="form1.checkword" show-password placeholder="确认密码" :prefix-icon="Lock" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="submit" :loading="loading">注册</el-button>
        <el-button type="text" style="margin: 0 auto;" @click="emits('change')">使用已有账号登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang='scss' scoped>
.form {
  background: #ffffff;
  border-radius: 6px;
  width: 300px;
  padding: 20px;
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>
