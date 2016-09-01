<script>
    require('./header.scss')
    import dataService from '../../../services/dataservices'
    export default{

        template:require('./header.html'),
        data(){
            return{
              showlogin:false,
              showAddScope: false,
              user:{},
              userScopes:[],
              tag: this.$route.params.tag ? this.$route.params.tag : "",
              logo: require('../../../assets/scope_live_logo.png')
            }
        },


        watch:{
            '$route.path':{
                 handler: (val, oldVal)=>{
                   if(val != '/'){
                        $('#header').removeClass('home')

                   }else if(val.indexOf('embed') > 0) {

                        $('#header').hide()

                   }else{

                        $('#header').addClass('home')
                    }
                 },
                 deep: true
            },

            '$route.params.tag': function(newVal, oldVal){
                  this.tag = newVal;
            },

    'user':function(oldV,newV){
      if(oldV.email || newV.email){
        if(!newV.email || newV.email != oldV.email){
          dataService.getUserScopes(0,4).then((res)=>{
            this.userScopes = res.data.data;
        })
        }
        this.$nextTick(()=>{
          $('.scope_dropdown_button').dropdown({
          inDuration: 300}
        );
      })
      }
    }
        },

        methods:{

          searchTag(tag){

            this.$route.router.go({path: `/search/${tag.trim()}`});

          },

          signOut(){
            delete localStorage._scopetoken;
            window.location.href = window.location.origin;

          }
        },

        ready(){
          $('.dropdown-button').dropdown({
              inDuration: 300}
          );

          if(this.$route.path != '/') $('#header').removeClass('home')

        },
        components:{
          login:require('../../login/login.vue'),
        }
    }
</script>
