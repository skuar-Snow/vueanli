<script setup>
import { reactive, ref } from 'vue'
import { Lock, User } from '@element-plus/icons-vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const emits = defineEmits(['change'])

const router = useRouter()
const form = ref({
  username: '',
  password: ''
})
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '用户名长度在3 - 10位', trigger: 'change' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

const formRef = ref(null)
const loading = ref(false)

const submit = async () => {
  await formRef.value.validate()
  loading.value = true
  const res = await axios.post('http://121.89.213.194:9001/api/login', form.value)
  loading.value = false
  if (res.data.code === 0) {
    ElMessage.success('登录成功！')
    localStorage.setItem('token', res.data.token)
    router.push('/')
  } else {
    ElMessage.error(res.data.msg)
  }
}
</script>

<template>
  <div class="form">
    <h2>登录</h2>
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
    >
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" :prefix-icon="User" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" show-password placeholder="请输入密码" :prefix-icon="Lock" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="submit" :loading="loading">登录</el-button>
        <el-button type="text" style="margin: 0 auto;" @click="emits('change')">去注册</el-button>
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
