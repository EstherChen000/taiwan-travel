import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import * as VueGoogleMaps from 'vue2-google-maps';

import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_MAP,
    libraries: 'places',
  },
  installComponents: true,
});

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
