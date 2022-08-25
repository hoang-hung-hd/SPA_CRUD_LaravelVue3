// import Vue from 'vue'
import { createApp } from "vue";
import App from '@/App.vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from './auth'

// Vue.use(Vuex)
const app = createApp(App)

export default new Vuex.Store({
    plugins:[
        createPersistedState()
    ],
    modules:{
        auth
    }
})