import request from '@/utils/request'

export function login(account, password) {
  return request({
    url: '/vue/login ',
    method: 'post',
    data: {
      account,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/vue/user_info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
