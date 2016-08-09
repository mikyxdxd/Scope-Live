export default(App)=>{

  let VueRouter = require('vue-router');
  let router = new VueRouter({
    hashbang: false,
    history: true,
    root: '/'
  })

  router.beforeEach((transition)=>{setTimeout(()=>{window.scrollTo(0,0)},100);transition.next()});
  router.map({
    '/user':{
      component:require('./components/user/user.vue')
    },
    '/s/:scopeId/setting':{
      component:require('./components/user/scopesetting/scopesetting.vue')
    }
  })

  router.start(App,'#app');

}
