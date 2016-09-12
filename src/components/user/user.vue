<script>
    require('./user.scss')
    export default{
        data(){
        },
        template:require('./user.html'),
        components:{
            sidemenu:require('./sidemenu/sidemenu.vue'),
            dashboard:require('./dashboard/dashboard.vue')
        }
    }
</script>
