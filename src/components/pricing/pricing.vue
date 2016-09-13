<script>
    require('./pricing.scss')
    export default{
        template:require('./pricing.html'),
        data(){
            return{
              phone: require('../../assets/phone_icon.png')
            }
        },

      ready(){
      },
        components:{
          search:require('../landing/search/search.vue')
        },
    }
</script>
