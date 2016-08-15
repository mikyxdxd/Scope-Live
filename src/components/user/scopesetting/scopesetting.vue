<script>
    require('./scopesetting.scss')
    import dataService from '../../../services/dataservices'
    export default{
        template:require('./scopesetting.html'),
        data(){
            return {
                scopeId:null,
                scope:null
            }
        },
        ready(){
            this.scopeId = this.$route.params.scopeId;
            dataService.getScopeInfo(this.scopeId).then((res)=>{
              this.scope = res.data;
              if(this.scope.owner.id != dataService.getUser().id ){

              }else{

                this.scope = res.data;
              }

            })
        },

        components:{

          leftmenu:require('./leftmenu/leftmenu.vue'),
          general:require('./general/general.vue')
        }
    }
</script>
