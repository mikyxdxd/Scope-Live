<script>
    require('./general.scss')
    export default{
        template:require('./general.html'),
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
          general:require('./general.vue')
        }
    }
</script>
