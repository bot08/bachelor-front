import { createApp } from 'vue'
import axios from "axios";
import '@/styles/tailwind.css'
import '@/styles/custom.css'
import App from '@/App.vue'
import { routes } from '@/routes.js'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

const app = createApp(App)

// base url
axios.defaults.baseURL = "https://harhive.pp.ua/t/src"
// time out
axios.defaults.timeout = 9999;

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach((to, from, next) => {
  next();
  // Edit scroll visibility
  document.body.style.overflowY = to.meta.showScroll ? 'scroll' : 'visible';
  // Changes title & description
  document.title = to.meta.title+" - магазин";
  // og
  if(navigator.userAgent.toLowerCase().indexOf('prerender') !== -1) {
    document.querySelector('meta[property="og:title"]').setAttribute("content", to.meta.title+" - магазин");
    document.querySelector('meta[property="og:description"]').setAttribute("content", to.meta.description);
    document.querySelector('meta[name="description"]').setAttribute("content", to.meta.description);
    document.querySelector('meta[property="og:url"]').setAttribute("content", window.location);
    to.meta.image && document.querySelector('meta[property="og:image"]').setAttribute("content", window.location.protocol+'//'+window.location.hostname+to.meta.image);
  }
})

app.use(createPinia())
app.use(router)
app.mount('#app')