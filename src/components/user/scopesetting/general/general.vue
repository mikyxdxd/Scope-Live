<script>
    require('./general.scss')
    import dataService from '../../../../services/dataservices'
    export default{
        template:require('./general.html'),
        ready(){
          this.scopeId = this.$route.params.scopeId;
          this.scope = Object.assign({}, this.scope, {$$tagArr :this.scope.tag.split('#')});
        },
        methods:{
          addTag:function(){

            this.scope.$$tagArr.push(this.newTag);
            this.newTag  = '';

          },
          deleteTag:function(tag){

            this.scope.$$tagArr.splice(this.scope.$$tagArr.indexOf(tag),1);
          },
          updateScope: function(){
            this.scope.description = this.newDesc;
            this.scope.tag =  '#' + this.scope.$$tagArr.join('#');
            this.scope.sourceType = 'MEMBER';
            console.log(this.scope.tag)
            this.scope.caption = this.newCaption;
            var self = this;

            dataService.updateScope(self.scopeId, self.scope).then((res)=>{
              if(res.data.result == "OK"){
                toastr.success('Your Scope has been updated');
              }else{

              }
          });




//            let geocoder = new google.maps.Geocoder();
//            geocoder.geocode({'address': self.newAddress}, function(results, stats){
//              if(stats == google.maps.GeocoderStatus.OK){
//                let lat = results[0].geometry.location.lat();
//                let long = results[0].geometry.location.lng();
//                let location = {
//                  'address': self.newAddress,
//                  'latitude': lat,
//                  'longitude': long
//                };
//                self.scope.location = location;
//
//                dataService.updateScope(self.scopeId, self.scope).then((res)=>{
//                  if(res.data.result == "OK"){
//
//                  }else{
//
//                  }
//                });
//
//              }else{
//                console.log(results, stats);
//              }
//            });

          },
          deleteScope: function(){
            dataService.deleteScope(this.scopeId).then((res)=>{
              if(res.result.data == "OK"){
                console.log("DELETED");
              }else{
                console.log("not existed");
              }
            });
          }
        },
        data(){
            return{
                scopeId: '',
                newDesc:'',
                newAddress: '',
                newCaption: '',
                newTag: '',
            }
        },
        components:{
          general:require('./general.vue')
        },
      props:['scope']
    }
</script>
