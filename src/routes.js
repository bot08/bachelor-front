import Home from '@/views/Home.vue'
import Sunglasses from '@/views/sunglasses/Index.vue'
import SunglassesItem from '@/views/sunglasses/Item.vue'

// import CharactersList from '@/views/Characters/Index.vue'
// import Dictionary from '@/views/Dictionary.vue'
// import Gacha from '@/views/Gacha/Index.vue'
// import Items from '@/views/Items/Index.vue'
// import Useful from '@/views/Useful.vue'
// import InteractiveMap from '@/views/InteractiveMap.vue'
import About from '@/views/About.vue'
import User from '@/views/user/Index.vue'
import Registration from '@/views/user/Registration.vue'
// Lazy loaded
// const CharacterPage = () => import('@/views/Characters/Character.vue')
// const GachaWeapons = () => import('@/views/Gacha/Weapons.vue')
// const GachaChronicle = () => import('@/views/Gacha/Chronicle.vue')
// const WeaponsPage = () => import('@/views/Items/Weapons.vue')
// const WeaponPage = () => import('@/views/Items/Weapon.vue')
// const DevIndex = () => import('@/views/Dev/Index.vue')
// const DevUser = () => import('@/views/Dev/User.vue')
// const Wardrobe = () => import('@/views/Wardrobe.vue')
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

  // 404 error
  { path: '/:path(.*)', component: NotFound, meta: { title: '404', description: 'Not found' }},
]
