import Home from '@/views/Home.vue'
import Sunglasses from '@/views/sunglasses/Index.vue'
import SunglassesItem from '@/views/sunglasses/Item.vue'
import Accessories from '@/views/accessories/Index.vue'
import AccessoriesItem from '@/views/accessories/Item.vue'

import OrderAdd from '@/views/order/Add.vue'

import About from '@/views/About.vue'
import User from '@/views/user/Index.vue'
import Registration from '@/views/user/Registration.vue'

import AddSunglasses from '@/views/add/Sunglasses.vue'
import AddAccessories from '@/views/add/Accessories.vue'

// Lazy loaded
const NotFound = () => import('@/views/NotFound.vue')


/** 
 * @type {import('vue-router').RouterOptions['routes']} 
**/
export const routes = [
  { 
    path: '/', 
    component: Home, 
      meta: { 
        title: 'Головна сторінка',
        description: '' 
      }
  },
  {
    path: '/sunglasses',
    component: Sunglasses,
      meta: { 
        title: 'Сонцезахисні',
        description: '',
        // image: '/img/icon-fr.png',
        showScroll: true
      }
  },
  {
    path: "/sunglasses/:id",
    component: SunglassesItem,
      meta: { 
        title: 'Сонцезахисні',
        description: ''
      }
  },
  {
    path: '/accessories',
    component: Accessories,
      meta: { 
        title: 'Аксесуари',
        description: '',
        showScroll: true
      }
  },
  {
    path: "/accessories/:id",
    component: AccessoriesItem,
      meta: { 
        title: 'Аксесуар',
        description: ''
      }
  },
  {
    path: '/order',
    component: OrderAdd,
      meta: { 
        title: 'Замовлення',
        description: '',
        // image: '/img/icon-fr.png',
        // showScroll: true
      }
  },
  {
    path: '/about',
    component: About,
      meta: { 
        title: 'Про роботу',
        description: '',
        // image: '/img/icon-fr.png',
        // showScroll: true
      }
  },
  {
    path: '/user',
    component: User,
      meta: { 
        title: 'Сторінка користувача',
        description: '',
        // image: '/img/icon.png',
        // showScroll: true
      }
  },
  {
    path: '/registration',
    component: Registration,
      meta: { 
        title: 'Сторінка реєстрації користувача',
        description: '',
        // image: '/img/icon.png',
        // showScroll: true
      }
  },
  {
    path: '/add/sunglasses',
    component: AddSunglasses,
      meta: { 
        title: 'Добавити сонцезахисні',
        description: '',
        // image: '/img/icon-fr.png',
        // showScroll: true
      }
  },
  {
    path: '/add/accessories',
    component: AddAccessories,
      meta: { 
        title: 'Добавити аксесуар',
        description: '',
        // image: '/img/icon-fr.png',
        // showScroll: true
      }
  },

  // 404 error
  { path: '/:path(.*)', component: NotFound, meta: { title: '404', description: 'Not found' }},
]
