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
          url: '/api/users/login.php', 
          data: credentials, 
          headers: {
            'Content-Type': 'application/json'
          } 
        })
        .then(res => {
          if (res.data.token) {
            document.cookie = `token=${res.data.token};path=/;max-age=${7 * 24 * 60 * 60}`
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
      document.cookie = 'token=;path=/;max-age=0'
      this.token = null
      this.isAuthenticated = false
    },
    loadAuthState() {
      const token = this.getCookie('token')
      this.token = token
      this.isAuthenticated = !!token
    },
    getCookie(name) {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) return parts.pop().split(';').shift()
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
