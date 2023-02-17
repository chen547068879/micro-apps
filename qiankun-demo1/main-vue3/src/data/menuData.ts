/*
 * @Author: chenxin
 * @Date: 2023-02-17 16:19:43
 * @LastEditTime: 2023-02-17 17:19:02
 * @Description: file content
 */
import { AsyncComponentLoader } from "vue"

export interface Menu {
  name: string
  path?: string
  component?: string | AsyncComponentLoader
  key: number
  children?: Menu[]
}

export const menuList: Menu[] = [
  {
    key: 1,
    name: 'Vue3主应用',
    path: 'main',
    component: 'Layout.vue',
    children: [
      {
        key: 11,
        path: 'home',
        name: '主应用home页面',
        component: 'HomeView.vue'
      },
      {
        key: 12,
        path: 'about',
        name: '主应用about页面',
        component: 'AboutView.vue'
      },
    ]
  },
  {
    key: 2,
    name: 'Vue3子应用',
    path: 'vue3App',
    component: 'Layout.vue',
    children: [
      {
        key: 21,
        path: 'test',
        name: 'Vue3测试'
      },
      {
        key: 22,
        path: 'navigate-view',
        name: '子应用跳转测试'
      }
    ]
  },
  {
    key: 3,
    name: 'React18子应用',
    path: 'reactApp',
    component: 'Layout.vue',
    children: [
      {
        key: 31,
        path: 'test',
        name: 'React18测试'
      },
      {
        key: 32,
        path: 'navigate-view',
        name: '子应用跳转测试'
      }
    ]
  }
]