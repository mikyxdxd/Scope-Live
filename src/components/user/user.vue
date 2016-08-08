<script>
    require('./user.scss')
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        template:require('./user.html'),
        components:{
            sidemenu:require('./sidemenu/sidemenu.vue'),
            dashboard:require('./dashboard/dashboard.vue')
        }
    }
</script>
