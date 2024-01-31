import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia'
import { createWebHashHistory } from 'vue-router'
import MasonryWall from '@yeger/vue-masonry-wall'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import App from './App.vue'
import createRouter from './router/index'
import './tailwind.css'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const router = createRouter(createWebHashHistory())

const app = createApp(App)

app.use(router)

app.use(MasonryWall)

app.use(createPinia())

app.mount('#app')
