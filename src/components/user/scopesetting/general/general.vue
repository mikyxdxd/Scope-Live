<script>
    require('./general.scss')
    import dataService from '../../../../services/dataservices'
    export default{
        template:require('./general.html'),
        ready(){
          this.scopeId = this.$route.params.scopeId;
          console.log(this.scopeId);

        },
        methods:{
          updateScope: function(){
            this.scope.description = this.newDesc;
            this.scope.tag = this.newTag;
            this.scope.caption = this.newCaption;
            var self = this;
            let geocoder = new google.maps.Geocoder();
            //if self.newAddress is not empty

            if(self.newAddress != ""){
              geocoder.geocode({'address': self.newAddress}, function(results, stats){
                if(stats == google.maps.GeocoderStatus.OK){
                  let lat = results[0].geometry.location.lat();
                  let long = results[0].geometry.location.lng();
                  let location = {
                    'address': self.newAddress,
                    'latitude': lat,
                    'longitude': long
                  };
                  self.scope.location = location;

                  dataService.updateScope(self.scopeId, self.scope).then((res)=>{
                    if(res.data.result == "OK"){
                    console.log(res.data);
                    toastr.options = {"timeOut": "10000", "positionClass": "toast-top-center",};
                    toastr.success('Your Update Successfully');
                  }else{
                    toastr.options = {"timeOut": "10000", "positionClass": "toast-top-center",};
                    toastr.success('Your Update Failed. Please try again!');
                  }
                });

                  //else the result is empty
                }else{

                  dataService.updateScope(self.scopeId, self.scope).then((res)=>{
                    if(res.data.result == "OK"){
                    console.log(res.data);
                    toastr.options = {"timeOut": "10000", "positionClass": "toast-top-center",};
                    toastr.success('Your Update Successfully');
                  }else{
                    toastr.options = {"timeOut": "10000", "positionClass": "toast-top-center",};
                    toastr.success('Your Update Failed. Please try again!');
                  }
                  });
                }
              });
              //if newAddress is empty, update the scope without address
            }else{
              dataService.updateScope(self.scopeId, self.scope).then((res)=> {
                if(res.data.result == "OK"){
                console.log(res.data);
                toastr.options = {"timeOut": "10000", "positionClass": "toast-top-center",};
                toastr.success('Your Update Successfully');
                }
                else
                {
                  toastr.options = {"timeOut": "10000", "positionClass": "toast-top-center",};
                  toastr.success('Your Update Failed. Please try again!');
                }
              });
            }


          },
          deleteScope: function(){
            dataService.deleteScope(this.scopeId).then((res)=>{
              console.log(res);
              if(res.data.result == "OK"){
                toastr.options = {"timeOut": "10000", "positionClass": "toast-top-center",};
                toastr.success('Your scope has been deleted. ');
              }else{
                toastr.options = {"timeOut": "10000", "positionClass": "toast-top-center",};
                toastr.success('Your deletion failed. Please try again!');
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
