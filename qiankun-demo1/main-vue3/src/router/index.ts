import { useAppStore } from "@/store/app"
import { useMenuStore } from "@/store/menu"
import { loadMicroApp, MicroApp } from "qiankun"
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import HomeView from "../views/HomeView.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: '/main/home'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

const microAppMap = new Map<string, MicroApp>()

// 是否已经加载初始化数据
let loadedInitData = false
// 上次的location.hash
let lastHash = ''

router.beforeEach(async (to, form, next) => {
  const { addRoutes } = useMenuStore()
  if(!loadedInitData) {
    loadedInitData = true
    addRoutes()
    console.log('addRoutes', addRoutes)
    console.log('router getRoutes', router.getRoutes())
    next()
  } else {
    const { apps } = useAppStore()
    if(lastHash) {
      const app = apps.find(item => lastHash.startsWith(item.activeRule))
      if(app) {
        const name = app.name
        if(microAppMap.has(name)) {
          const microApp = microAppMap.get(name)!
          if(microApp.getStatus() === 'MOUNTED') {
            await microApp.unmount()
          }
        }
      }
    }
    next()
  }
})

let mounting = false;
router.afterEach(async (to) => {
  const { apps } = useAppStore()
  lastHash = location.hash
  const app = apps.find(item => lastHash.startsWith(item.activeRule))
  let microApp

  // 手动加载子应用
  if(app) {
    const name = app.name
    if(microAppMap.has(name)) {
      microApp = microAppMap.get(name)!
      if(!mounting) {
        mounting = true
        await microApp.mount()
        mounting = false
      }
    } else {
      if(!mounting) {
        mounting = true
        microApp = loadMicroApp(app)
        microAppMap.set(name, microApp)
        await microApp.mountPromise
      }
      mounting = false
    }
  }
})

export default router
