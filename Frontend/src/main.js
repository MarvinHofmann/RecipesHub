import { createApp } from 'vue'
import './style.css'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'bootstrap-icons/font/bootstrap-icons.css'

import App from './App.vue'

import router from './router/router'

const recipesHub = createApp(App);
recipesHub.use(router);
recipesHub.mount('#app');

