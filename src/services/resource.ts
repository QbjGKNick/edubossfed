/**
 * 资源相关请求模块
 */

// import store from '@/store'
import request from '@/utils/request'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getResourcePages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}
