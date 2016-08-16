<template>
    <div id="googleMap" v-show="show">
      <div id="map_canvas" style="width: 100%; height: 100%;"></div>
    </div>
</template>
<style>

</style>
<script>
    require('./map.scss');
    export default{
        ready(){
          var self = this;
          if(this.address != ""){
            self.myCenter = new google.maps.LatLng(self.lat, self.lng);
            self.mapProp = {
              center: self.myCenter,
              zoom: 10,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            let map = new google.maps.Map(document.getElementById("map_canvas"), self.mapProp);
            let marker = new google.maps.Marker({
              position: self.myCenter
            });
            marker.setMap(map);
          }
        },
        data(){
            return{
              myCenter: null,
              mapProp: null,
            }
        },
        components:{

        },
        methods:{

        },
        watch:{
          'show': function(v, ov){
            if(v == false){
              this.myCenter = null;
              this.mapProp = null;
              this.lat = '';
              this.lng = '';
            }
          }
        },
        events:{
          'update-address':function(newValue){
            console.log(newValue);
            var self = this;
            let geocoder = new google.maps.Geocoder();
            geocoder.geocode({'address': newValue}, function(results, stats){
              if(stats == google.maps.GeocoderStatus.OK) {
                console.log(results, stats);
                self.lat = results[0].geometry.location.lat();
                self.lng = results[0].geometry.location.lng();
                self.myCenter = new google.maps.LatLng(self.lat, self.lng);
                self.mapProp = {
                  center: self.myCenter,
                  zoom: 13,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                console.log(self.lat, self.lng);
                let map = new google.maps.Map(document.getElementById("map_canvas"), self.mapProp);
                let marker = new google.maps.Marker({
                  position: self.myCenter,
                });
                marker.setMap(map);
                self.show = true;
              }else{
                //no results
                toastr.options = {"timeOut": "3000", "positionClass": "toast-top-right", "preventDuplicates": true};
                toastr.error('No location results. Please try again.');
              }
            });
          }
        },
        props: ['address', 'lat', 'lng', 'show']

    }
</script>
