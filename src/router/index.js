import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/manager',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '客户经理列表',
        component: () => import('@/views/manager/index'),
        meta: { title: '客户经理', icon: 'peoples' }
      }
    ]
  },

  {
    path: '/weixinmp',
    component: Layout,
    redirect: '/weixinmp/config',
    name: 'weixin-mp',
    meta: { title: '微信公众号', icon: 'wechat' },
    children: [
      {
        path: 'config',
        name: 'Config-mp',
        component: () => import('@/views/weixinmp/config'),
        meta: { title: '配 置 项', icon: '' }
      },
      {
        path: 'template',
        name: 'Template-mp',
        component: () => import('@/views/weixinmp/template'),
        meta: { title: '消息模板', icon: '' }
      }
    ]
  },

  {
    path: '/druid',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '监控中心',
        component: () => import('@/views/druid/index'),
        meta: { title: '监控中心', icon: 'dashboard' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

