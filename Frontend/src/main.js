import { createApp } from 'vue'
import './style.css'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'bootstrap-icons/font/bootstrap-icons.css'

import App from './App.vue'

import router from './services/router'

import { createPinia } from 'pinia'
const pinia = createPinia()

import axios from './services/setupAxios'

const recipesHub = createApp(App);
recipesHub.use(pinia)
recipesHub.use(router);
recipesHub.mount('#app');

