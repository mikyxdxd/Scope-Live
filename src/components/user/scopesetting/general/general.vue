<script>
    require('./general.scss')
    import dataService from '../../../../services/dataservices'
    export default{
        template:require('./general.html'),
        ready(){
          this.scopeId = this.$route.params.scopeId;
          this.scope = Object.assign({}, this.scope, {$$tagArr :this.scope.tag.split('#')});
          if(this.scope.sourceType == "ALL"){
            $('#sourceTypeCheck').prop( "checked", true );
          }else{
            $('#sourceTypeCheck').prop( "checked", false );
          }
        },
        methods:{
          preventClick: function(e){
            e.stopPropagation();
          },
          addTag:function(){

            this.scope.$$tagArr.push(this.newTag);
            this.newTag  = '';

          },

          addLoc:function(){
            this.showMap = true;
            this.$broadcast('update-address', this.newAddress);
          },
          delLoc:function(){
            this.scope.location = null;
            this.showMap = false;
          },
          deleteTag:function(tag){

            this.scope.$$tagArr.splice(this.scope.$$tagArr.indexOf(tag),1);
          },
          updateScope: function(){
            this.scope.description = this.newDesc;
            this.scope.tag =  '#' + this.scope.$$tagArr.join('#');
            console.log(this.scope  )
            if(this.newSourceType){
              this.scope.sourceType = 'ALL';
            }else{
              this.scope.sourceType = 'MEMBER';
            }
            this.scope.caption = this.newCaption;
            var self = this;

//            if(this.newAddress != ""){
//              let location = {
//                'address': this.newAddress,
//                'latitude': this.newLat,
//                'longitude': this.newLng
//              };
//              this.scope.location = location;
//            }
            dataService.updateScope(self.scopeId, self.scope).then((res)=>{
                    if(res.data.result == "OK"){
                    console.log(res.data);
                  //  toastr.options = {"timeOut": "10000", "positionClass": "toast-top-full-width",};
                    toastr.success('Your Update Successfully');
                  }else{
                   // toastr.options = {"timeOut": "10000", "positionClass": "toast-top-full-width",};
                    toastr.success('Your Update Failed. Please try again!');
                  }
            });
          },
          deleteScope: function(){
            dataService.deleteScope(this.scopeId).then((res)=>{
              if(res.data.result == "OK"){
                //toastr.options = {"timeOut": "10000", "positionClass": "toast-top-full-width",};
                toastr.success('Your scope has been deleted. ');
                $('#sidemenu').trigger('::ScopeDel',this.scopeId);
              $('html').css('overflow-y','auto');
                this.$route.router.go({path: `/appcontent/dashboard`});
              }else{
               // toastr.options = {"timeOut": "10000", "positionClass": "toast-top-full-width",};
                toastr.error('Your deletion failed. Please try again!');
              }
            });
          }
        },
        watch: {
          'showDeleteModal':function(val, oldVal){
            if (val){
              $('html').css('overflow-y','hidden');
            }else{
              $('html').css('overflow-y','auto');
            }
          }
        },
        data(){
            return{
                scopeId: '',
                newDesc:'',
                newAddress: this.scope.location ? this.scope.location.address : "",
                newCaption: '',
                newTag: '',
                newSourceType: '',
//                newLat: this.scope.location ? this.scope.location.latitude : "",
//                newLng: this.scope.location ? this.scope.location.longitude : "",
                showMap: this.scope.location? true : false,
                showDeleteModal: false,
            }
        },
        components:{
          general:require('./general.vue'),
          map: require('../../../gMap/map.vue')
        },
      props:['scope']
    }
</script>
