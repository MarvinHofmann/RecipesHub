import axios from "axios"
import router from "./router";
import { useAuthStore } from "../stores/auth.store";

axios.interceptors.response.use(
    response => {
        if (response.status === 200 || response.status === 201) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        console.log("ERR", error);
        if (error.response.status) {
            switch (error.response.status) {
                case 400:
                    //do something
                    break;
                case 401:
                    const store = useAuthStore()
                    store.logout()
                    console.log("test");
                    router.push({ path: '/login', name: "login", query: { sessionExpired: true } })
                    break;
                case 404:
                    router.forward("/404")
                    break;
            }
            return Promise.reject(error.response);
        }
    }
)

export default axios