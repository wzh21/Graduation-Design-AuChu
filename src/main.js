import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// 引入全局样式
import '@/assets/styles/potree.css'
import '@/assets/styles/jquery-ui.css'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')

// 暴露全局变量
window.THREE = require('three')
window.TWEEN = require('@tweenjs/tween.js')
window.Potree = require('potree-core')