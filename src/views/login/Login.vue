<script setup>
import { ref } from 'vue';
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'

const showLogin = ref(true)
const change = () => {
  showLogin.value = !showLogin.value
}
</script>

<template>
  <div class="login">
    <LoginForm v-if="showLogin" @change="change" />
    <RegisterForm v-else @change="change" />
  </div>
</template>

<style lang='scss' scoped>
.login {
  width: 100%;
  height: 100%;
  background: url(https://img.alicdn.com/tfs/TB1cpTewMHqK1RjSZFEXXcGMXXa-2872-1580.png) no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
