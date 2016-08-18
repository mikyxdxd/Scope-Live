<script>
    require('./scopepage.scss');
    import dataServices from '../../services/dataservices'
    export default{
        template:require('./scopepage.html'),
        route:{
          canReuse: false
        },
        ready(){
          dataServices.getScopeInfo(this.$route.params.scopeId).then((res)=>{

            this.scope = res.data;
            if(this.scope.owner.id == dataServices.getUser().id){
              this.isOwner = true;
              this.currentTab = 'feature'
            }
          })
        },
      route:{
        canReuse:false
      },
        data(){
            return{
               scope:null,
               currentTab:null,
               isOwner:null,
               picked: "",
               showMap: false
            }
        },
        watch:{
          'picked': function(v, ov){
            if(v == 'location'){
              this.showMap = true;
              let opt = {
                'streetViewControl': false,
                'disableDoubleClickZoom': true
              }
              this.$broadcast('update-address', this.scope.location.address, opt, false);
            }
            if(v == 'tag'){
              this.showMap = false;
            }
          },
          'currentTab': function(v, ov){
            if(v == 'feature'){
              this.showMap = false;
            }
            if(v == 'latest' && this.picked=='location'){
              this.showMap = true;
            }
          }
        },
        components:{
          scopeheader:require('./scopeheader/scopeheader.vue'),
          featurepage:require('./featurepage/featurepage.vue'),
          latestpage:require('./latestpage/latestpage.vue'),
          map: require('../gMap/map.vue')
        }
    }
</script>
