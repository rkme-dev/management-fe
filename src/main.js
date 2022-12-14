import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import VCurrencyField from 'v-currency-field'
import AxiosInterceptors from '@/service/AxiosInterceptors'
import { VTextField } from 'vuetify/lib' // Globally import VTextField
import Ripple from 'vuetify/lib/directives/ripple'
import Vuetify from 'vuetify'
import VueQrcodeReader from 'vue-qrcode-reader'
import VueQRCodeComponent from 'vue-qrcode-component'
import VueMeta from 'vue-meta'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import './interceptors/axios'

Vue.component('qr-code', VueQRCodeComponent)

AxiosInterceptors(store)

Vue.config.productionTip = false
Vue.use(VueMeta)
Vue.component('v-text-field', VTextField)
Vue.use(VCurrencyField, {
  locale: 'en',
  decimalLength: 2,
  autoDecimalMode: true,
  min: null,
  max: null,
  defaultValue: 0,
  valueAsInteger: false,
  allowNegative: true,
})
Vue.use(VueQrcodeReader)

Vue.use(Vuetify, {
  directives: {
    Ripple,
  },
})

// window.Pusher = require('pusher-js')

// window.Echo = new Echo({
//   broadcaster: 'pusher',
//   key: process.env.VUE_APP_PUSHER_APP_KEY,
//   wsHost: process.env.VUE_APP_PUSHER_HOST,
//   wsPort: process.env.VUE_APP_PUSHER_PORT,
//   wssPort: process.env.VUE_APP_PUSHER_PORT,
//   forceTLS: false,
//   encrypted: true,
//   disableStats: true,
//   enabledTransports: ['ws', 'wss'],
// })

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
