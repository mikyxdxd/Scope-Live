<script>
    require('./header.scss')
    export default{
        template:require('./header.html'),
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
          login:require('../login/login.vue')
        }
    }
</script>
