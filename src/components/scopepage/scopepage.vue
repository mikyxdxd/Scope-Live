<script>
    require('./scopepage.scss');
    import dataServices from '../../services/dataservices'
    export default{
        template:require('./scopepage.html'),
        ready(){
          dataServices.getScopeInfo(this.$route.params.scopeId).then((res)=>{

            this.scope = res.data;
          })
        },
        data(){
            return{
               scope:null
            }
        },
        components:{
          scopeheader:require('./scopeheader/scopeheader.vue')
        }
    }
</script>
