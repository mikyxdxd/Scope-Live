<script>
    require('./header.scss')
    export default{
        template:require('./header.html'),
        data(){
            return{
              showlogin:false,
                user:null
            }
        },
        components:{
          login:require('../login/login.vue')
        }
    }
</script>
