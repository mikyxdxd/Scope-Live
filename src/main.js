import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);


/* eslint-disable no-new */
let app = Vue.extend({
  components:{
    s_header:require('./components/header/header.vue'),
    s_footer:require('./components/footer/footer.vue')
  }
})

import route from './route'
route(app);
