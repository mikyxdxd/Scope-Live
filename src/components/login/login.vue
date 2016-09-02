<script>
    require('./login.scss')
    import dataService from '../../services/dataservices'
    export default{
      template:require('./login.html'),
      ready(){
        if(localStorage._scopetoken != null && localStorage._scopetoken.length > 0){
          dataService.setUserToken(localStorage._scopetoken);
          this.userToken = localStorage._scopetoken;
          this.retriveUserProfile();
        }
      },
      methods:{
          userLogin(e){
            var self = this;
            e.preventDefault();
            dataService.logIn(this.username,this.password).then((res)=>{
              if(res.data.access_token){
                this.userToken = localStorage._scopetoken = res.data.token_type + ' ' + res.data.access_token;
                dataService.setUserToken(res.data.token_type + ' ' + res.data.access_token);
                this.retriveUserProfile();
                toastr.success("Login successfully");
                self.$route.router.go({path: '/appcontent/dashboard'});
              }
            })
          },

          retriveUserProfile(){

            dataService.getUserProfile().then((res)=>{
              this.user = res.data;
              dataService.setUser(this.user);
              this.showlogin = false;
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
          userToken:null

        }

      },
        components:{
        }
    }
</script>
