import './assets/main.css'
import 'vue-final-modal/style.css'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
const vfm = createVfm()

app.use(vfm).mount('#app')
import { createVfm } from 'vue-final-modal'



