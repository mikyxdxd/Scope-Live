import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

/* eslint-disable no-new */
let app = Vue.extend({})

import route from './route'
route(app);
