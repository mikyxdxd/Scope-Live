<script>
  require('./sidemenu.scss');
  import dataSerivces from '../../../services/dataservices'
  export default{
    template:require('./sidemenu.html'),
    ready(){
      this.user = dataSerivces.getUser();
      this.getUserScope();
      if(this.$route.path.indexOf('/s/') >= 0) this.currentScopeId = this.$route.params.scopeId;

      setTimeout(()=> {
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
      },1000)
    },
    data:function(){
      return{
        user: null,
        slideout:null,
        userScopes:null,
        currentScopeId:null
      }
    },

    methods: {
      signOut: function(){
          delete localStorage._scopetoken;
          window.location.href = window.location.origin;
      },
      hideMenu:function(){

        this.slideout.toggle();

      },
      getUserScope:function(){

          dataSerivces.getUserScopes(0,50).then((res)=>{
            this.userScopes = res.data.data;
          })
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
