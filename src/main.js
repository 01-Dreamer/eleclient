import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'


import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'


import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}



app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
