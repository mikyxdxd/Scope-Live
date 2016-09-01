<script>
    require('./appcontent.scss')
    export default{
        template:require('./appcontent.html'),
        data(){
            return{
              slideout:null
            }
        },

      ready(){


      },
      components:{
        sidemenu:require('../user/sidemenu/sidemenu.vue'),
        dashboard:require('../user/dashboard/dashboard.vue'),
        appheader:require('./appheader/appheader.vue')
      },
      methods:{

      }
    }
</script>
