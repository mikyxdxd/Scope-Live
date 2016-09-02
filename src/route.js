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
<<<<<<< HEAD
        if(dataService.getUserType() == 'user' && transition.to.path.indexOf('/appcontent') < 0 ){
=======
        if(dataService.getUserType() == 'user' && transition.to.path.indexOf('/appcontent') < 0
           && transition.to.path.indexOf('/embed/') < 0 && transition.to.path.indexOf('/p/') < 0
           ){
>>>>>>> 9e9ad8856efade95ab6ae89ff870267e18a8d0a5
          transition.redirect('/appcontent/dashboard');
        }else{
          transition.next();
          window.scrollTo(0,0);
        }
      }else{

      }
    },200);
    //transition.next()

  });

  router.redirect({
    '/': '/landing',
    '/appcontent': '/appcontent/dashboard',
  });

  router.map({
    '/':{
      component: require('./components/landing/landing.vue'),
      subRoutes:{
        'landing': {
          component: require('./components/landing/landingpage/landingpage.vue')
        },
        'pricing':{
          component: require('./components/pricing/pricing.vue')
        },
        '/pp':{
          component:require('./components/footer/privacypolicy/privacypolicy.vue')
        },
        '/tos':{
          component:require('./components/footer/termofservices/termofservices.vue')
        },
        '/search/:tag': {
          name: 'landSearch',
          component: require('./components/searchPage/search.vue')
        },
        '/login':{
          component:require('./components/login/login.vue')
        }
      }
    },
    '/user':{
      component:require('./components/user/user.vue')
    },

    '/s/:scopeId':{
      name: 'scope',
      component:require('./components/scopepage/scopepage.vue')
    },
    '/p/:scopeId':{
      component:require('./components/presenting/presenting.vue')
    },
    '/embed/:scopeId':{
      component:require('./components/presenting/presenting.vue')
    },


    '/appcontent':{
      component:require('./components/appcontent/appcontent.vue'),
      subRoutes:{
        '/dashboard':{
          component:require('./components/user/dashboard/dashboard.vue')
        },
        '/s/:scopeId':{
          name: 'scope',
          component:require('./components/scopepage/scopepage.vue')
        },
        '/s/:scopeId/setting':{
          name: 'scopeSetting',
          component:require('./components/user/scopesetting/scopesetting.vue')
        },
        '/search/:tag': {
          name: 'search',
          component: require('./components/searchPage/search.vue')
        }
      }
    }
  })

  router.start(App,'#app');

}
