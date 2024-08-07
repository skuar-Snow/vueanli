<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const router = useRouter()
const defaultAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

const CommandEvent = {
  userinfo() {
    router.push('/userinfo')
  },
  logout() {
    localStorage.removeItem('token')
    router.push('/login')
    ElMessage.success('退出登录')
  }
}

const handleCommand = key => {
  if (CommandEvent[key]) {
    CommandEvent[key]()
  }
}

</script>

<template>
  <div class="header">
    <div class="logo">
      <img src="https://element-plus.org/images/element-plus-logo.svg" alt="">
    </div>
    <div class="user" style="height: 40px">
      <el-space>
        <el-avatar :size="40" :src="userStore.userInfo.avatar || defaultAvatar" />
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ userStore.userInfo.username }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-space>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.header {
  height: 60px;
  background: #ffffff;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center
}
.logo {
  width: 120px;
  img {
    width: 100%;
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
  outline: none;
}
</style>
