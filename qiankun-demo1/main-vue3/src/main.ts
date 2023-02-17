/*
 * @Author: chenxin
 * @Date: 2023-02-17 09:47:16
 * @LastEditTime: 2023-02-17 15:16:16
 * @Description: file content
 */
import { createPinia } from "pinia"
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

const app = createApp(App)

app.use(createPinia())
app.use(router).mount("#app")
