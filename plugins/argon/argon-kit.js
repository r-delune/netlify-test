import "@/assets/argon/assets/vendor/nucleo/css/nucleo.css";
import "@/assets/argon/assets/vendor/font-awesome/css/font-awesome.css";
import "@/assets/argon/assets/scss/argon.scss";

import Vue from 'vue'
import globalComponents from "./globalComponents";
import globalDirectives from "./globalDirectives";
import VueLazyload from "vue-lazyload";
import vClickOutside from 'v-click-outside';

Vue.use(globalComponents);
Vue.use(globalDirectives);
Vue.use(VueLazyload);
// Replace custom click-outside directive with vClickOutside (IOS fix)
Vue.use(vClickOutside);
