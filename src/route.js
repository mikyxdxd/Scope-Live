export default(App)=>{
  let VueRouter = require('vue-router');
  let dataService = require('./services/dataservices');
  let router = new VueRouter({
    hashbang: false,
    history: true,
    root: '/'
  })

  router.beforeEach((transition)=>{

    let verifyUser = setInterval(()=>{
      if(dataService.getUserType() != null){
        clearInterval(verifyUser);
        transition.next();
        window.scrollTo(0,0);
      }else{

      }
    },200);
    //transition.next()

  });




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
      name: 'scopeSetting',
      component:require('./components/user/scopesetting/scopesetting.vue')
    },
    '/s/:scopeId':{
      name: 'scope',
      component:require('./components/scopepage/scopepage.vue')
    },
    '/p/:scopeId':{
      component:require('./components/presenting/presenting.vue')
    }
  })

  router.start(App,'#app');

}
