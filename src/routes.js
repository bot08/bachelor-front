import Home from '@/views/Home.vue'
import Sunglasses from '@/views/sunglasses/Index.vue'
import SunglassesItem from '@/views/sunglasses/Item.vue'
import Accessories from '@/views/accessories/Index.vue'
import AccessoriesItem from '@/views/accessories/Item.vue'

import OrderAdd from '@/views/order/Add.vue'
import ViewOrders from '@/views/order/View.vue'

import About from '@/views/About.vue'
import User from '@/views/user/Index.vue'
import Registration from '@/views/user/Registration.vue'

// Lazy loaded
const AddSunglasses = () => import('@/views/add/Sunglasses.vue')
const AddAccessories = () => import('@/views/add/Accessories.vue')
const AddFrames = () => import('@/views/add/Frames.vue')
const AddLenses = () => import('@/views/add/Lenses.vue')

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
        title: 'лінзи та аксесуари',
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
    path: '/order/view',
    component: ViewOrders,
      meta: { 
        title: 'Перегляд замовлень',
        description: '',
        showScroll: true
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
      }
  },
  {
    path: '/add/frames',
    component: AddFrames,
      meta: { 
        title: 'Добавити оправу',
        description: '',
      }
  },
  {
    path: '/add/lenses',
    component: AddLenses,
      meta: { 
        title: 'Добавити лінзи для окулярів',
        description: '',
      }
  },

  // 404 error
  { path: '/:path(.*)', component: NotFound, meta: { title: '404', description: 'Not found' }},
]
