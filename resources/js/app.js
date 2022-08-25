import './bootstrap';


// require('alpinejs');
import ElementPlus from 'element-plus'
import { createApp } from "vue";
import App from '@/App.vue'
import router from '@/router'
import store from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// import axios from 'axios'
// import VueAxios from 'vue-axios'
// createApp({
//     components: {}
// }).mount('#app')

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

// app.use(VueAxios, axios)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')