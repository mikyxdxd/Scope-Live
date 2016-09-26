export default(App,Vue)=>{
  let VueRouter = require('vue-router');
  let dataService = require('./services/dataservices');
  let router = new VueRouter({
    hashbang: false,
    history: true,
    root: '/'
  })

  router.beforeEach((transition)=>{

    var verifyTransition = setInterval(()=>{

      if(dataService.getUserType() != null){

        if( transition.to.path.indexOf('/embed/') >= 0 || transition.to.path.indexOf('/p/') >= 0){

          clearInterval(verifyTransition);
          transition.next();
          window.scrollTo(0,0);

        }
        else if(dataService.getUserType() == 'user' && dataService.getUser() != null){
          clearInterval(verifyTransition);

          if(transition.to.path.indexOf('/appcontent') < 0 || transition.to.path.indexOf('login') > 0 ){

            transition.redirect('/appcontent/dashboard');

          }else{
            transition.next();
            window.scrollTo(0,0);
          }

        }else if(dataService.getUserType() == 'visitor'){
          clearInterval(verifyTransition);

          if(transition.to.path.indexOf('/appcontent') >= 0 && transition.to.path.indexOf('?cont=') < 0 ){

            if(window.location.hash){
              let hashValue = window.location.hash;
              hashValue = hashValue.replace(/^#access_token=/, '');
              localStorage._insToken = hashValue;
              console.log(localStorage._insToken);
              dataService.getInstagramUserInfo(localStorage._insToken, (res)=>{
                if(res.meta.code != 400){
                  console.log(res.data);
                  let userName = res.data.username;
                  let email = userName + '@scopealive.com';
                  let password = '12345678';
                  dataService.register(userName,email,password).then((res)=>{
                    console.log(res);
                    if(res.data.result == "EMAIL_USED"){
                      dataService.logIn(email,password).then((res)=>{
                        console.log(res);
                        if(res.data.access_token){
                          localStorage._scopetoken = res.data.token_type + ' ' + res.data.access_token;
                          dataService.setUserToken(res.data.token_type + ' ' + res.data.access_token);
                          toastr.success('Signed in via Instagram Successfully');
                          setTimeout(()=>{
                            window.location.href='/appcontent/dashboard';
                          }, 2000);

                        }
                      });
                    }else if(res.data.result == "OK"){
                      localStorage._scopetoken = res.data.token.token_type + ' ' + res.data.token.access_token;
                      dataService.setUserToken(res.data.token.token_type + ' ' + res.data.token.access_token);
                      window.location.href='/appcontent/dashboard';
                    }
                  })
                }
              });
            }
            else{transition.redirect('/login?cont=' + window.location.pathname.replace('/appconet', ''));}

          }else{

            transition.next();
            window.scrollTo(0,0);

          }

        }
      }
    })
  });

  router.redirect({
    // '/': '/landing',
    '/appcontent': '/appcontent/dashboard',
  });

  router.map({

    '*':{
      component: Vue.extend({ready(){window.location.href = '/'}})
    },

    '/':{
      component: require('./components/landing/landing.vue'),
      subRoutes:{
        '/': {
          component: require('./components/landing/landingpage/landingpage.vue')
        },
        'contact':{
          component:require('./components/landing/contactpage/contactpage.vue')
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
        },
        '/feature':{
          component:require('./components/landing/feature/feature.vue')
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
