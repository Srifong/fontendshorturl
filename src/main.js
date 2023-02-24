import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from 'axios'
import VueClipboards from 'vue-clipboards'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.baseURL = "https://pythonshorturl.herokuapp.com"

loadFonts()

createApp(App)
  .use(router,axios)
  .use(store)
  .use(vuetify)
  .use(VueClipboards)
  .mount('#app')





  


  
