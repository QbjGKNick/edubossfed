/**
 * 菜单相关请求模块
 */

// import store from '@/store'
import request from '@/utils/request'
import type { IMenu } from './types/menu'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createOrUpdateMenu = (data: IMenu) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

export const getEditMenuInfo = (id: string | number = -1) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}

export const getAllMenus = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

export const deleteMenu = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}
