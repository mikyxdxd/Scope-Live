<script>
    require('./appheader.scss')
    export default{
        template:require('./appheader.html'),
        data(){
            return{
              logo: require('../../../assets/scope_live_logo.png'),
              showAddScope:false,
            }
        },

      ready(){


      },
      components:{
        addscope: require("../../addScope/addScope.vue")
      },
      methods:{

      }
    }
</script>
