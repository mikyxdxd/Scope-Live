<script>
  require('./sidemenu.scss');
  import dataSerivces from '../../../services/dataservices'
  export default{
    template:require('./sidemenu.html'),
    ready(){
      this.user = dataSerivces.getUser();
      this.getUserScope();
      if(!localStorage._insToken){
        this.avatar = this.user.avatar;
      }
      if(this.$route.path.indexOf('/s/') >= 0) this.currentScopeId = this.$route.params.scopeId;

      setTimeout(()=>{
        this.slideout = new Slideout({
        'panel': document.getElementById('appcontent_view'),
        'menu': document.getElementById('sidemenu'),
        'padding': 220,
        'duration':500,
        'tolerance': 10
      });
      var self = this;
      document.querySelector('#toggle-button').addEventListener('click', function() {
        self.slideout.toggle();
      });
      document.querySelector('#routerview').addEventListener('click', function() {
        if (self.slideout.isOpen()){
          self.slideout.close();
        }
      });
      $('#sidemenu').on('::ScopeAdd', (e,s)=>{
          this.userScopes.unshift(s);
      });
      $('#sidemenu').on('::ScopeDel',(e,s)=>{
          this.userScopes = $.grep(this.userScopes,function(ele){
              return ele.id != s;
        });
      });
      },1000)
    },
    events:{
      'AddScope':function(){console.log('get')}
    },
    data:function(){
      return{
        user: null,
        slideout:null,
        userScopes:null,
        currentScopeId:null,
        avatar: this.getUserAvatar()
      }
    },

    methods: {
      signOut: function(){
          delete localStorage._scopetoken;
          delete localStorage._insToken;
          window.location.href = window.location.origin;
      },
      hideMenu:function(){

        this.slideout.toggle();

      },
      getUserScope:function(){

          dataSerivces.getUserScopes(0,50).then((res)=>{
            this.userScopes = res.data.data;
          })
      },
      getUserAvatar: function(){
        var self = this;
        if(localStorage._insToken){
          dataSerivces.getInstagramUserInfo(localStorage._insToken, (res)=>{
            if(res.meta.code != 400){
              self.avatar = res.data.profile_picture;
            }
          });
        }
      }
    },

    watch:{

      '$route': {
        handler: function (val, oldVal) {

        },
        deep: true
      }

    }
  }

</script>
