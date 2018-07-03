import request from '@/utils/request'

export function getManager(params) {
  return request({
    baseURL: '',
    url: '/vue/get_managers',
    method: 'post',
    data: params
  })
}

export function addManager(data) {
  return request({
    baseURL: '',
    url: '/vue/add_manager',
    method: 'post',
    data
  })
}
