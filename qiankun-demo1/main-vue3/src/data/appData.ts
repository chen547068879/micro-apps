/*
 * @Author: chenxin
 * @Date: 2023-02-17 15:11:10
 * @LastEditTime: 2023-02-17 15:13:15
 * @Description: file content
 */
export interface MicroApp {
  name: string
  entry: string
  container: string
  activeRule: string
}

export const apps: MicroApp[] = [
  {
    name: 'vue3App',
    entry: 'http://localhost:8091',
    container: '#child-app',
    activeRule: '/vue3App'
  },
  {
    name: 'react18App',
    entry: 'http://localhost:8092',
    container: '#child-app',
    activeRule: '/react18App'
  },
]