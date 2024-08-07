import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({
    username: '',
    avatar: ''
  })

  const getUserInfo = async () => {
    const res = await axios.get('http://121.89.213.194:9001/api/user/info', {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    userInfo.value = res.data.values
  }

  return {
    userInfo,
    getUserInfo
  }
})