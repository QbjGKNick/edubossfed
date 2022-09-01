import axios, { AxiosRequestConfig } from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

const redirectLogin = () => {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

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
  console.log(response)
  const status = response.data.state
  if (!status || status === 1) {
    return response
  }
  // 如果是自定义错误状态码，错误处理就写到这里
  return response
}, async error => {
  // 如果是使用的 HTTP 状态码，错误处理就写到这里
  if (error.response) { // 请求发出去收到响应了，但是状态码超出了 2xx 范围
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // token 无效（没有提供 token、token 是无效的、token 过期了）
      // 如果有 refresh_token 则尝试使用refresh_token 获取新的 access_token
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }
      // 尝试刷新获取新的 token
      try {
        const { data } = await axios.create()({
          method: 'POST',
          url: '/front/user/refresh_token',
          data: qs.stringify({
            refreshtoken: store.state.user.refresh_token
          })
        })
        //    成功了 -> 把本次失败的请求重新发出去
        // 把刷新拿到的新的 access_token 更新到容器和本地存储中
        store.commit('setUser', data.content)
        // 把本次失败的请求重新发出去
        return request(error.config)
      } catch (err) {
        // 把当前登录用户状态清除
        store.commit('setUser', null)
        //    失败了 -> 跳转登录页面重新登录获取新的 token
        redirectLogin()
        return Promise.reject(error)
      }
      // 如果没有，则直接跳转登录页
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) { // 请求发出去没有收到响应
    Message.error('请求超时，请刷新重试')
  } else { // 在设置请求时发生了一些事情，触发了一个错误
    Message.error(`请求失败：${error.message}`)
  }
  return Promise.reject(error)
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async <T = any>(config: AxiosRequestConfig) => {
  return await request(config).then(res => {
    return (res.data.data || res.data.content || res.data) as T
  })
}
