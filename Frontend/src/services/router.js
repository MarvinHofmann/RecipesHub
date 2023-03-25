import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

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
            { path: '/rezept/:id', name: 'rezept', component: detailRecipe },
            { path: '/login', name: 'login', component: login, props: route => ({ query: route.query.q }) },
            { path: '/registrieren', name: 'registrieren', component: register },
            { path: '/wochenPlan', name: 'wochenPlan', component: weekPlaner },
            { path: '/browse', name: 'browse', component: browse },
            { path: '/:pathMatch(.*)*', component: p404 },
        ],
        scrollBehavior(to, from, savedPosition) {
            // always scroll to top
            return { top: -10 }
        },
    });

// Event Listener checks if user presses backButton (window.popstate event)
window.pressedBackButton = false
window.addEventListener('popstate', () => {
    window.pressedBackButton = true
})

router.beforeEach(async (to, from, next) => {
    const userStore = useAuthStore();
    const publicPages = ["/login", "/registrieren"];
    const authRequired = !publicPages.includes(to.path); // Check for public pages
    const auth = userStore.isLoggedIn
    if (authRequired && !auth) {
        next({
            path: '/login',
            query: { sessionExpired: true }
        })
        return;
    }
    // If user presses back button and gets redirected to 404 go to home
    if (to.path == "/404" && window.pressedBackButton) {
        next({
            path: '/home',
        })
        return
    }
    next()
})

export default router;