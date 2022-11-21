import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueCalendarHeatmap from 'vue-calendar-heatmap'
import '@fortawesome/fontawesome-free/js/all.js'


Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueCalendarHeatmap)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
