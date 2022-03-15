// 基于axios封装的请求模块

import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ttapi.reserach.itcast.cn/'
})

export default request
