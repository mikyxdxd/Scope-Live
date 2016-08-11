<script>
    require('./scopepage.scss');
    import dataServices from '../../services/dataservices'
    export default{
        template:require('./scopepage.html'),
        ready(){
          dataServices.getScopeInfo(this.$route.params.scopeId).then((res)=>{

            this.scope = res.data;
            if(this.scope.owner.id == dataServices.getUser().id){
              this.isOwner = true;
              this.currentTab = 'feature'
            }
          })
        },
        data(){
            return{
               scope:null,
               currentTab:null,
               isOwner:null
            }
        },
        components:{
          scopeheader:require('./scopeheader/scopeheader.vue'),
          featurepage:require('./featurepage/featurepage.vue'),
          latestpage:require('./latestpage/latestpage.vue')
        }
    }
</script>
