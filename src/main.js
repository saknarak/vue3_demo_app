import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createHead } from '@vueuse/head'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'

import App from './app.vue'
// import 'virtual:windi.css'
// import 'virtual:windi-devtools'

import './assets/app.scss'
import store from './store'

const vuexStore = createStore(store)

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)
  .use(vuexStore)
  .use(router)
  .use(createHead())

Object.values(import.meta.globEager('./plugins/*.js')).map(i => i.install?.({ app, store: vuexStore }))

app.mount('#app')
