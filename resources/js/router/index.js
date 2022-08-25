// import AllProduct from '@/pages/product/AllProduct.vue';
// import CreateProduct from '@/pages/product/CreateProduct.vue';
// import EditProduct from '@/pages/product/EditProduct.vue';

import Register from '@/components/Register.vue';
import Login from '@/components/Login.vue';
import Dashboard from '@/components/Dashboard.vue';
import DahboardLayout  from '@/components/layouts/Dashboard.vue';
import store from '../store'

import { createRouter, createWebHistory } from 'vue-router'
import Layout from  '@/layout'
export const routes = [
    {
        name: 'products',
        path: '/products',
        component: Layout,
        children: [
            {
              path: '',
              component: () => import('@/pages/product/AllProduct.vue')
            },
            
            {
                name: 'create',
                path: 'create',
                component: import('@/pages/product/CreateProduct.vue')
            },

        ]
    },
    {
        name: 'register',
        path: '/register',
        component: Register,
        meta: { guestOnly: true }
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
        meta: { guestOnly: true }
    },
    {
        path:"/",
        component:DahboardLayout,
        meta:{
            middleware:"auth"
        },
        children:[
            {
                name:"dashboard",
                path: '/',
                component: Dashboard,
                meta:{
                    title:`Dashboard`
                }
            },
            {
                name:"userList",
                path: '/users',
                component: () => import('@/pages/user/AllUser.vue'),
                meta:{
                    title:`All User`
                }
            },
        ]
    }
];

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
  })

router.beforeEach((to, from, next) => {
    const isAuthenticated  = store.state.auth.authenticated
    if (to.name !== 'login' && !isAuthenticated) next({ name: 'login' })
    // if the user is not authenticated, `next` is called twice
    next()
})

export default router