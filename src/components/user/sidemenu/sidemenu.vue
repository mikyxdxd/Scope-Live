<script>
  require('./sidemenu.scss');
  import dataSerivces from '../../../services/dataservices'
  export default{
    template:require('./sidemenu.html'),
    ready(){
      this.user = dataSerivces.getUser();
      console.log(this.user)
    },
    data:function(){
      return{
        user: null
      }
    }
  }

</script>
