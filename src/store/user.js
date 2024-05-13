import { defineStore, acceptHMRUpdate } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    isAuthenticated: false
  }),
  actions: {
    async login(credentials) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post', 
          url:'/api/users/login.php', 
          data: credentials, 
          headers: {
            'Content-Type': 'application/json'
          } 
        })
        .then(res => {
          if (res.data.token) {
            localStorage.setItem('token', res.data.token)
            this.token = res.data.token
            this.isAuthenticated = true
            resolve(res.data.token)
          }
          else {
            alert("Неправильний логін або пароль")
            reject(new Error('Невірні облікові дані'))
          }
        })
        .catch(e => {
          alert('Помилка авторизації')
          reject(e)
        })
      })
    },
    logout() {
      localStorage.removeItem('token')
      this.token = null
      this.isAuthenticated = false
    },
    loadAuthState() {
      const token = localStorage.getItem('token')
      this.token = token
      this.isAuthenticated = !!token
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
