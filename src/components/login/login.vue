<script>
    require('./login.scss')
    import dataService from '../../services/dataservices'
    export default{
      template:require('./login.html'),
      ready(){

        if(this.$route.query.op  == 'sign'){

          this.currentSelected = 'signup';

        }else{

          this.currentSelected = 'login';
        }
      },
      route:{
        canReuse: false
      },
      methods:{
          userLogin(e){
            e.preventDefault();
            var self = this;
            e.preventDefault();
            dataService.logIn(this.username,this.password).then((res)=>{
              if(res.data.access_token){
                this.userToken = localStorage._scopetoken = res.data.token_type + ' ' + res.data.access_token;
                dataService.setUserToken(res.data.token_type + ' ' + res.data.access_token);
                this.retriveUserProfile(()=>{

                  toastr.success("Login successfully");
                  if(!this.$route.query.cont){
                    self.$route.router.go({path: '/appcontent/dashboard'});
                  }else{
                    this.$route.router.go({path: this.$route.query.cont});
                  }
                });

              }
            })
          },

          registerUser(e){
            e.preventDefault();
            if(this.reg_password.length < 6){

              toastr.error('Sorry, the password must contain at least 6 characters');
            }else if(this.reg_password != this.reg_compassword){

              toastr.error('Sorry, the password and its confirm are identical');
            }else{
              dataService.register(this.reg_name,this.reg_username,this.reg_password).then((res)=>{
                if(res.data.result == "EMAIL_USED"){

                  toastr.error('Sorry, this email address has already been registered');

                }else if(res.data.result == "OK"){

                  this.userToken = localStorage._scopetoken = res.data.token.token_type + ' ' + res.data.token.access_token;
                  dataService.setUserToken(res.data.token.token_type + ' ' + res.data.token.access_token);
                  this.retriveUserProfile(()=>{
                    toastr.success("Register successfully");
                    if(!this.$route.query.cont){
                      this.$route.router.go({path: '/appcontent/dashboard'});
                    }else{
                      this.$route.router.go({path: this.$route.query.cont});
                    }
                  });
                }
              })
            }
          },
          retriveUserProfile(cb){

            dataService.getUserProfile().then((res)=>{
              this.user = res.data;
              dataService.setUser(this.user);
              this.showlogin = false;
              cb();
            }).catch((e)=>{
              delete this.userToken;
              delete localStorage._scopetoken;
              dataService.setUserToken(null);
            })
          }

      },
      props:['user','showlogin'],
      data:function(){

        return{

          username:null,
          password:null,
          userToken:null,
          currentSelected:null,
          reg_name:null,
          reg_username:null,
          reg_password:null,
          reg_compassword:null

        }

      },
        components:{
        }
    }
</script>
