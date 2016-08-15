<template>
    <div id="googleMap" style="width:100%; height: 200px;" v-show="show">
    </div>
</template>
<style>

</style>
<script>
    export default{
        ready(){
          var self = this;
          console.log(this.address);
          if(this.address != ""){
            this.show = true;
            self.myCenter = new google.maps.LatLng(self.lat, self.lng);
            self.mapProp = {
              center: self.myCenter,
              zoom: 5,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            let map = new google.maps.Map(document.getElementById("googleMap"), self.mapProp);
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
              show: false
            }
        },
        components:{

        },
        methods:{

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
                  zoom: 5,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                let map = new google.maps.Map(document.getElementById("googleMap"), self.mapProp);
                let marker = new google.maps.Marker({
                  position: self.myCenter
                });
                marker.setMap(map);
                self.show = true;
              }else{
                console.log(results,stats);
                console.log("NO RESULT");
              }
            });
          }
        },
        props: ['address', 'lat', 'lng']

    }
</script>
