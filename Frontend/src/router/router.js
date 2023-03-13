import { createRouter, createWebHistory } from 'vue-router'

import home from '../views/Home.vue'
import about from '../views/About.vue'
import detailRecipe from '../views/DetailRecipe.vue'
import login from '../views/Login.vue'
import register from '../views/Register.vue'
import weekPlaner from '../views/WeekPlaner.vue'
import browse from '../views/Browse.vue'
import p404 from '../views/PageNotFound.vue'

const router =
    createRouter({
        history: createWebHistory(),
        routes: [
            { path: '/home', name: 'home', component: home },
            { path: '/about', name: 'about', component: about },
            { path: '/rezept', name: 'rezept', component: detailRecipe },
            { path: '/login', name: 'login', component: login },
            { path: '/registrieren', name: 'registrieren', component: register },
            { path: '/wochenPlan', name: 'wochenPlan', component: weekPlaner },
            { path: '/browse', name: 'browse', component: browse },
            { path: '/:pathMatch(.*)*', component: p404 },
        ],
        scrollBehavior(to, from, savedPosition) {
            // always scroll to top
            return { top: -10 }
        },
    })

export default router;