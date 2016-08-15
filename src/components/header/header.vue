<script>
    require('./header.scss')
    export default{
        template:require('./header.html'),
        data(){
            return{
              showlogin:false,
              showAddScope: false,
              user:{},
              tag: this.$route.params.tag ? this.$route.params.tag : ""
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
            },

            '$route.params.tag': function(newVal, oldVal){
                  this.tag = newVal;
            }
        },

        methods:{
          searchTag: function(tag){
            console.log(tag);
            this.$route.router.go({ name: 'search', params: { tag: tag}});
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
