import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Modal from './components/Modal/index.vue'

import VTooltip from 'v-tooltip'

createApp(App)
  .use(store)
  .use(router)
  .use(VTooltip)
  .component('Modal', Modal)
  .mount('#app')
