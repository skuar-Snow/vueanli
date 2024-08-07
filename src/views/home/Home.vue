<script setup>
import Header from '../../components/header/Header.vue'
import Aside from '@/components/aside/Aside.vue'
import { RouterView } from 'vue-router'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

userStore.getUserInfo()
</script>

<template>
  <div class="home">
    <Header />
    <main>
      <Aside />
      <div class="content">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style lang='scss' scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  main {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
}
.content {
  flex: 1;
  overflow: auto;
  padding: 20px;
  background: #eeeeee;
}
</style>
