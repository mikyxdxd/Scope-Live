<script>
    require('./header.scss')
    export default{

        //TODO My Scopes Button Should display a dropdown of list of scope

        template:require('./header.html'),
        data(){
            return{
              showlogin:false,
              showAddScope: false,
              user:{}
            }
        },


        watch:{
            '$route.path':{
                 handler: (val, oldVal)=>{
                   if(val != '/'){
                        $('#header').removeClass('home')
                    }else{

      $('#header').addClass('home')
    }
                 },
                 deep: true
            }


        },

        methods:{

          searchTag:function(tag){

            this.$route.router.go({path: `/search/${tag}`});
          }
        },
        ready(){
          $('.dropdown-button').dropdown({
              inDuration: 300}
          );
          if(this.$route.path != '/') $('#header').removeClass('home')

        },
        components:{
          login:require('../login/login.vue'),
          addscope: require('../addScope/addScope.vue')
        }
    }
</script>
