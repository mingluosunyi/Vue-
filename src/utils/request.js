// 基于axios封装的请求模块

import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ttapi.reserach.itcast.cn/'
})

request.interceptors.request.use(
  function (config) {
    const user = window.localStorage.getItem('token')

    if (user) {
      config.headers.Authorization = `Bearer ${user}`
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default request
