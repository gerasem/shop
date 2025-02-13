import './assets/styles/main.scss'
import i18n from "./i18n";

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from 'unhead'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const head = createHead()

app.use(createPinia())
app.use(router)
app.use(i18n);
//@ts-ignore
app.use(head);

app.mount('#app')
