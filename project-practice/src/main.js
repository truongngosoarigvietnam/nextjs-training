import { createApp } from 'vue'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import App from './App.vue'
import router from "./router/router"
import './assets/main.css'
import store from "@/vuex/store"
import i18n from "@/language/i18n"
import '@vuepic/vue-datepicker/dist/main.css'

import {registerGlobalComponents} from "./utils/import"
import mitt from 'mitt';                  // Import mitt
const emitter = mitt();  
library.add(fas, far, fab)
const app = createApp(App)

registerGlobalComponents(app)

app.component("font-awesome-icon", FontAwesomeIcon)
app.component('VueDatePicker', VueDatePicker);
app.use(LoadingPlugin);
app.use(i18n)
app.use(store)
app.use(VueSweetalert2);
app.provide('emitter', emitter);
app.use(router)
app.mount('#app')
