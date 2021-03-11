import Vue from 'vue'
import App from './App.vue'
import InlineSvg from 'vue-inline-svg';


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.component('inline-svg', InlineSvg);