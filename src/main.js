import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)
// 安装状态管理工具
app.use(createPinia())

app.use(ElementPlus)


app.mount('#app')
