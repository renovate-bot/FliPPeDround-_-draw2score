import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueKonva from 'vue-konva'
import './svgicons/iconfont.js'
import './assets/fonts/font.css'
import './plugins/element.js'

Vue.config.productionTip = false

Vue.use(VueKonva)

new Vue({
  store,

  data: {
    event: new Vue()
  },

  render: h => h(App)
}).$mount('#app')
