import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // {
  //   path: '/login',
  //   component: () => import('@/views/welcome/login/index'),
  //   hidden: true
  // },

  // {
  //   path: '/register',
  //   component: () => import('@/views/welcome/register/index'),
  //   hidden: true
  // },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '个人信息', icon: 'dashboard' }
    }],
    hidden: true
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/user',
    name: 'Permission',
    meta: { title: '用户权限管理', icon: 'user' },
    children: [
      {
        path: 'user',
        name: 'Table',
        component: () => import('@/views/permission/user/index'),
        meta: { title: '用户列表', icon: 'table' }
      },
      {
        path: 'system',
        name: 'Table',
        component: () => import('@/views/permission/system/index'),
        meta: { title: '系统管理', icon: 'table' }
      },
      {
        path: 'system/department',
        name: 'Table',
        component: () => import('@/views/permission/system/department/index'),
        meta: { title: '部门管理', icon: 'table' }
      },
      {
        path: 'system/role',
        name: 'Table',
        component: () => import('@/views/permission/system/role/index'),
        meta: { title: '角色管理', icon: 'table' }
      },
      {
        path: 'system/menu',
        name: 'Table',
        component: () => import('@/views/permission/system/menu/index'),
        meta: { title: '菜单管理', icon: 'tree' }
      },
      {
        path: 'system/allocation',
        name: 'Table',
        component: () => import('@/views/permission/allocation/index'),
        meta: { title: '权限配置', icon: 'tree' },
        // hidden: true
      }
    ]
  },
  // {
  //   path: '/analyze',
  //   component: Layout,
  //   redirect: '/analyze/MixChart',
  //   name: 'Analyze',
  //   meta: { title: '系统管理', icon: 'user' },
  //   children: [
  //     {
  //       path: 'MixChart',
  //       name: 'MixChart',
  //       component: () => import('@/views/permission/user/index'),
  //       meta: { title: '系统列表', icon: 'chart' }
  //     },
  //     {
  //       path: 'CustomerMap',
  //       name: 'MixChart',
  //       component: () => import('@/views/permission/user/index'),
  //       meta: { title: '客户地图', icon: 'chart' }
  //     }
  //   ]
  // },
  // {
  //   path: 'github-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/ChongqingWangYu',
  //       meta: { title: 'GitHub Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
