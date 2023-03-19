import { defineStore } from 'pinia'
import { useStorage } from "@vueuse/core"
import { loginUser, logoutUser } from '../api/userHandling';

export const useAuthStore = defineStore('store', {
    id: 'auth',
    state: () => {
        return {
            user: useStorage('USER', {}),
        }
    },
    getters: {
        getUser() {
            return this.user
        },
        isLoggedIn: (state) => state.user
    },
    actions: {
        async login(username, password) {
            // Load Userdata from backend store it pagewide
            let response = await loginUser(username, password)
            if (response.data) {
                // Change iso date string to locale date string (German)
                response.data.registrationDate = new Date(response.data.registrationDate).toLocaleDateString("de-DE")
                localStorage.setItem('USER', JSON.stringify(this.user));
                this.user = response.data
            }
            return response
        },
        async logout() {
            // Remove User Credentials
            let response = await logoutUser()
            if (!response.error) {
                this.user = null
                localStorage.removeItem('USER');
                setTimeout(() => { location.reload() }, 500)
            }
        },
        deleteUser() {
            this.user = null;
            localStorage.removeItem('USER');
        }
    },
});