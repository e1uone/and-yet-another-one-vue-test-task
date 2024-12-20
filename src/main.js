import './styles/main.css'
import 'vue-final-modal/style.css'

import { createApp } from 'vue'
import App from './App.vue'

import { setLocale } from 'yup';

const app = createApp(App)
const vfm = createVfm()

app.use(vfm).mount('#app')
import { createVfm } from 'vue-final-modal'

setLocale({
  mixed: {
    default: 'Поле заполнено не верно',
    required: 'Поле является обязательным',
    positive: 'Число должно быть положительным',
  },
});


