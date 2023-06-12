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
        ]
    });


// Event Listener checks if user presses backButton (window.popstate event)
window.pressedBackButton = false
window.addEventListener('popstate', () => {
    window.pressedBackButton = true
})

router.beforeEach(async (to, from, next) => {
    // Get state of Event-Listener
    const backButtonPressed = window.pressedBackButton
    window.pressedBackButton = false
    // Get information about LoggedIn Status
    const userStore = useAuthStore();
    const auth = userStore.isLoggedIn
    // Check if to.path is a public Page
    const publicPages = ["/login", "/registrieren"];
    const authRequired = !publicPages.includes(to.path);
    if (authRequired && !auth) {
        // Not logged in or session expired return to login
        next({
            path: '/login',
            query: { sessionExpired: true }
        })
        return;
    }
    if (to.path == "/404" && backButtonPressed) {
        // Back Button pressed and requested page is 404
        // Go Back to Home to prevent endless loop
        next({
            path: '/home',
        })
        return
    }
    // Else send user to requested page
    next()
})

export default router;