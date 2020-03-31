import Vue from 'vue'
import App from './App.vue'
import store from './store'
// eslint-disable-next-line no-unused-vars
//BootstrapVue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './style.scss'

Vue.use(BootstrapVue);
Vue.use(IconsPlugin)


Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
