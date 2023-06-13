import { defineStore } from 'pinia'
import { useStorage } from "@vueuse/core"
import { loginUser, logoutUser } from '../api/userHandling';

export const useAuthStore = defineStore('store', {
    id: 'auth',
    state: () => {
        return {
            user: useStorage(
                'USER',
                null,
                undefined,
                {
                    serializer: {
                        read: (v) => v ? JSON.parse(v) : null,
                        write: (v) => JSON.stringify(v),
                    },
                },
            ),
            token: useStorage('TOKEN', null)
        }
    },
    getters: {
        getUser() {
            return this.user
        },
        isLoggedIn() {
            try {
                return this.token === this.user.token
            } catch (error) {
                return false
            }
        }
    },
    actions: {
        async login(username, password, rememberMe) {
            // Load Userdata from backend store it pagewide
            let response = await loginUser(username, password, rememberMe)
            if (response.data) {
                // Change iso date string to locale date string (German)
                response.data.user.registrationDate = new Date(response.data.user.registrationDate).toLocaleDateString("de-DE")
                this.user = response.data.user
                this.user.token = response.data.sessionToken
                this.token = response.data.sessionToken
                localStorage.setItem('USER', JSON.stringify(this.user));
                localStorage.setItem('TOKEN', this.token)
                console.log(this.user, this.token);
                //await new Promise(r => setTimeout(r, 2000));
            }
            return response
        },
        async logout() {
            // Remove User Credentials
            let response = await logoutUser()
            if (!response.error) {
                this.user = null
                localStorage.removeItem('USER');
                localStorage.removeItem('TOKEN');
                //setTimeout(() => { location.reload() }, 500)
            }
        },
        deleteUser() {
            this.user = null;
            localStorage.removeItem('USER');
            localStorage.removeItem('TOKEN');
        }
    },
});