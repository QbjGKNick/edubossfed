import axios, { AxiosRequestConfig } from 'axios'
import store from '@/store'

const request = axios.create({
  // 配置选项
  // baseURL,
  // timeout
})

// 请求拦截器
request.interceptors.request.use(config => {
  const user = store.state.user
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
}, async error => {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(response => {
  const status = response.data.state
  if (!status || status === 1) {
    return response
  }
  return response
}, async error => {
  return Promise.reject(error)
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async <T = any>(config: AxiosRequestConfig) => {
  return await request(config).then(res => {
    return (res.data.data || res.data.content || res.data) as T
  })
}
