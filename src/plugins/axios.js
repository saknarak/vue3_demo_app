import axios from 'axios'

import config from '../config'

const defaultAxios = axios.create({
  baseURL: config.apiUrl,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export const install = ({ app, store }) => {
  console.log('axios install')
  app.config.globalProperties.$axios = defaultAxios
  app.config.globalProperties.$http = defaultAxios

  defaultAxios.interceptors.response.use(response => {
    if (response.data?.session === null) {
      store.commit('setSession', null)
      store.commit('setSessionTimeout', 1)
    }
    return response
  }, error => {
    console.log('response', error)
    return Promise.reject(error)
  })
}
