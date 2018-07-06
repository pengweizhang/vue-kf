import request from '@/utils/request'
// 获取权限菜单列表
export function getPermission() {
  return request({
    url: '/permission',
    method: 'get'
  })
}
// 获取菜单
export function getMenus() {
  return request({
    url: '/menus',
    method: 'get'
  })
}
// 修改菜单
export function editMenu(data) {
  return request({
    url: '/menus',
    method: 'post',
    data
  })
}
// 添加菜单
export function addMenu(data) {
  return request({
    url: '/menus',
    method: 'put',
    data
  })
}
