import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userId: null,
    user: null
  },
  mutations: {
    authUser (state, userData) {
      state.token = userData.token
      state.userId = userData.userId
    },
    storeUser (state, user) {
      state.user = user
    },
    clearAuthData (state) {
      state.token = null
      state.userId = null
    }
  },
  actions: {
    setLogoutTimer ({commit}, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime * 1000)
    },
    signup ({commit}, forcData) {
      axios.post('users/signup', {
        username: forcData.username,
        password: forcData.password,
        firstname: forcData.firstname,
        lastname: forcData.lastname,
      })
        .then(res => {
          console.log(res)
          console.log(res.data)
          commit('clearAuthData')
          router.replace('/signin')
        })
        .catch(err => {
          console.log(err)
          alert("SignUp Unsuccessful!");
        })
    },
    login ({commit, dispatch}, authData) {
      axios.post('users/login', {
        username: authData.username,
        password: authData.password,
//        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('userId', res.data.userId)
          localStorage.setItem('expirationDate', expirationDate)
          commit('authUser', {
            token: res.data.token,
            userId: res.data.userId,
          })
          dispatch('setLogoutTimer', res.data.expiresIn)
          if(res.data.manager){
            router.replace('Manager')
          }
          else{
            router.replace('Dashboard')
          }
          
        })
        .catch(error => {
          console.log(error)
          alert("Login Unsuccessful!");
        })
    },
    tryAutoLogin ({commit}) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if (now >= expirationDate) {
        return
      }
      const userId = localStorage.getItem('userId')
      commit('authUser', {
        token: token,
        userId: userId
      })
    },
    logout ({commit}) {
      commit('clearAuthData')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      router.replace('/signin')
    },
  },
  getters: {
    isAuthenticated (state) {
      return state.token !== null
    },
    isToken (state) {
      return state.token
    },
    isUser(state){
      return state.userId
    }
  }
})