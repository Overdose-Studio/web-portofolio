import { createApp } from 'vue'
import App from './App.vue'
import './assets/style/style.css'
import $eventHandler from './utils/events.js';

let app = createApp(App)
app.config.globalProperties.$eventHandler = $eventHandler;
app.mount('#app')
