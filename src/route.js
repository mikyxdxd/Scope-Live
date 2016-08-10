export default(App)=>{

  let VueRouter = require('vue-router');
  let router = new VueRouter({
    hashbang: false,
    history: true,
    root: '/'
  })

  router.beforeEach((transition)=>{setTimeout(()=>{window.scrollTo(0,0)},100);transition.next()});
  router.map({
    '/':{
      component: require('./components/landing/landing.vue')
    },
    '/user':{
      component:require('./components/user/user.vue')
    },
    '/search/:tag': {
      name: 'search',
      component: require('./components/searchPage/search.vue')
    },
    '/s/:scopeId/setting':{
      component:require('./components/user/scopesetting/scopesetting.vue')
    },
    '/s/:scopeId':{
      component:require('./components/scopepage/scopepage.vue')

    }
  })

  router.start(App,'#app');

}
