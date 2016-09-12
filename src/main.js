import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource';
Vue.use(VueRouter);
Vue.use(VueResource);


/* eslint-disable no-new */
let app = Vue.extend({
  components:{
    // s_header:require('./components/landing/header/header.vue')
  }
})

import route from './route'
route(app);
