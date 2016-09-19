import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource';
Vue.use(VueRouter);
Vue.use(VueResource);
let app = Vue.extend({})
import route from './route'
route(app);
