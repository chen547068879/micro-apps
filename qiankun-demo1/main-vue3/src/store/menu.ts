/*
 * @Author: chenxin
 * @Date: 2023-02-17 16:28:46
 * @LastEditTime: 2023-02-17 17:16:11
 * @Description: file content
 */
import { defineStore } from "pinia"
import { reactive } from "vue"
import { menuList as menu } from '@/data/menuData'
import type { RouteRecordRaw } from "vue-router"
import type { Menu } from "@/data/menuData"
import router from "@/router"

// menu转Routes
function transformRoutes(menus: Menu[], parentPath = ''): RouteRecordRaw[] {
  const res: RouteRecordRaw[] = []
  for (const menu of menus) {
    const { path, component, children, key } = menu
    const routeItem: RouteRecordRaw = {
      name: key + '',
      path: '',
      children: []
    }
    // 处理一级路由
    if(!parentPath && (!children || children?.length === 0)) {
      routeItem.name = `top${menu.key}`
      routeItem.component = () => import('@/views/Layout/index.vue')
      routeItem.path = ''
      routeItem.children = [
        {
          name: menu.key + '',
          path: `/${menu.path}`
        } as RouteRecordRaw
      ]
      if(component) {
        routeItem.children[0].component = () => import(`../views/${component}`)
      }
      res.push(routeItem)
      continue
    }
    routeItem.path = parentPath + '/' + path
    if(component) {
      routeItem.component = () => import(`../views/${component}`)
    }
    if(children) {
      routeItem.children = transformRoutes(children, routeItem.path)
    }
    res.push(routeItem)
  }
  return res
}

export const useMenuStore = defineStore('menu', () => {
  const menuList: Menu[] = reactive([])
  const flattenMenuList: Menu[] = reactive([])

  const addRoutes = () => {
    transformRoutes(menu).forEach(item => router.addRoute(item))
    // console.log('addRoutes', transformRoutes(menu))
    console.log('menu', menu)
    console.log('transformRoutes', transformRoutes(menu))
    console.log('router', router)
  }
  
  return { menuList, flattenMenuList, addRoutes }
})