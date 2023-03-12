import { defineStore } from 'pinia'
import { useStorage } from "@vueuse/core"
const IP = "http://localhost";
import { loginUser } from '../api/userHandling';

export const useAuthStore = defineStore('store', {
    id: 'auth',
    state: () => {
        return {
            user: useStorage('USER', {}),
            token: useStorage('TOKEN', "")
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
            return response
        },
        logout() {
            // Remove User Credentials
        },
    },
});