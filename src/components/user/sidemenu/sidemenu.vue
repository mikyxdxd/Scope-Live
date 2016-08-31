<script>
  require('./sidemenu.scss');
  import dataSerivces from '../../../services/dataservices'
  export default{
    template:require('./sidemenu.html'),
    ready(){
      this.user = dataSerivces.getUser();
    },
    data:function(){
      return{
        user: null
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
