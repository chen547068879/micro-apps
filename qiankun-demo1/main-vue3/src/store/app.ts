/*
 * @Author: chenxin
 * @Date: 2023-02-17 15:16:37
 * @LastEditTime: 2023-02-17 15:22:05
 * @Description: file content
 */
import { MicroApp } from "@/data/appData"
import { defineStore } from "pinia"
import { computed, reactive } from "vue"
import { apps as microApps } from '@/data/appData'
import { prefetchApps } from "qiankun"

export const useAppStore = defineStore('appStore', () => {
  const apps = reactive<MicroApp[]>(microApps)
  // 预加载
  prefetchApps(microApps.map(item => ({
    name: item.name,
    entry: item.entry
  })))
  const paths = computed(() => apps.map(item => item.activeRule))
  return { apps, paths }
})