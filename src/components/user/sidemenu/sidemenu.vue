<script>
  require('./sidemenu.scss');
  import dataSerivces from '../../../services/dataservices'
  export default{
    template:require('./sidemenu.html'),
    ready(){
      this.user = dataSerivces.getUser();

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
        slideout:null
      }
    },

    methods: {
      signOut: function(){
          delete localStorage._scopetoken;
          window.location.href = window.location.origin;
      },
    }
  }

</script>
