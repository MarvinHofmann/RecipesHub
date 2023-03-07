import { createRouter, createWebHistory } from 'vue-router'

import home from '../views/Home.vue'
import about from '../views/About.vue'
import createRecipe from '../views/CreateRecipe.vue'
import detailRecipe from '../views/DetailRecipe.vue'
import login from '../views/Login.vue'
import register from '../views/Register.vue'
import weekPlaner from '../views/WeekPlaner.vue'


export default router =
    createRouter({
        history: createWebHistory(),
        routes: [
            { path: '/home', name: 'home', component: home },
            { path: '/about', name: 'about', component: about },
            { path: '/neuesRezept', name: 'neuesRezept', component: createRecipe },
            { path: '/rezept', name: 'rezept', component: detailRecipe },
            { path: '/login', name: 'login', component: login },
            { path: '/registrieren', name: 'registrieren', component: register },
            { path: '/wochenPlan', name: 'wochenPlan', component: weekPlaner },
        ],
        scrollBehavior(to, from, savedPosition) {
            // always scroll to top
            return { top: -10 }
        },
    })