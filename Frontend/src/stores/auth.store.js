import { defineStore } from 'pinia'
import axios from "axios"
import { useStorage } from "@vueuse/core"
const IP = "http://localhost";

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
        },
        logout() {
            // Remove User Credentials
        },
    },
});