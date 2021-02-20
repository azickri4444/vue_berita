import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import Vuex from 'vuex'
import VueEditor from 'vueditor'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBookOpen, faBookReader, faCheck, faInfoCircle, faTrash, faVideo, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'
import 'vueditor/dist/style/vueditor.min.css'

library.add( faBookReader, faBookOpen, faVideo, faTrash, faCheck, faInfoCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueEditor, config)
Vue.use(VueSweetalert2);

const firebaseConfig = {
  apiKey: "AIzaSyDNqZo7GNYJKP-kgjPQ_ZvHIBVl85bU9Ls",
  authDomain: "vue-login-299a2.firebaseapp.com",
  projectId: "vue-login-299a2",
  storageBucket: "vue-login-299a2.appspot.com",
  messagingSenderId: "1043566297386",
  appId: "1:1043566297386:web:3e8825eda1c9bd9c3fde53",
  measurementId: "G-DZ68V2D52D"
};

let config = {
  toolbar: [
    'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor'
  ],
  fontName: [
    {val: 'arial black'}, 
    {val: 'times new roman'}, 
    {val: 'Courier New'}
  ],
  fontSize: ['12px', '14px', '16px', '18px', '0.8rem', '1.0rem', '1.2rem', '1.5rem', '2.0rem'],
  uploadUrl: ''
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
