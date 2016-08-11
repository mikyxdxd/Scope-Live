<script>
    require('./header.scss')
    export default{
        template:require('./header.html'),
        data(){
            return{
              showlogin:false,
              user:{}
            }
        },


        watch:{

            '$route.path':{

                 handler: (val, oldVal)=>{

                   if(val != '/'){

      $('#header').removeClass('home')
                    }

                 },
                 deep: true
            }


        },

        methods:{

        },
        ready(){
          $('.dropdown-button').dropdown({
              inDuration: 300}
          );
        },
        components:{
          login:require('../login/login.vue'),
          addscope: require('../addScope/addScope.vue')
        }
    }
</script>
