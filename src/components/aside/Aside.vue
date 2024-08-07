<script setup>
import {
  Setting,
  PieChart,
  User
} from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div class="aside">
    <el-menu
      :default-active="route.path"
      class="menu"
      active-text-color="white"
      background-color="skyblue"
      router
      style="font-size: 20px; font-weight: 900;"
    >
      <el-menu-item index="/dashboard">
        <el-icon><PieChart /></el-icon>
        <span>统计</span>
      </el-menu-item>
      <el-menu-item index="/userlist">
        <el-icon><User /></el-icon>
        <span>用户管理</span>
      </el-menu-item>
      <el-menu-item index="/userinfo">
        <el-icon><setting /></el-icon>
        <span>个人设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style lang='scss' scoped>
.aside {
  width: 200px;
}
.menu {
  height: 100%;
}
</style>
