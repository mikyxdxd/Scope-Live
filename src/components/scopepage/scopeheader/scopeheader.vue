<script>
    require('./scopeheader.scss')
    export default{
        template:require('./scopeheader.html'),
        props:['scope'],
        data(){
            return{
                msg:'hello vue'
            }
        },
    }
</script>
