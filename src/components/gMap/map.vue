<template>
    <div id="googleMap">
      <div id="map_canvas"></div>
    </div>
</template>
<style>

</style>
<script>
    require('./map.scss');
    export default{
        ready(){
              if(this.scope.location && this.scope.location.latitude && this.scope.location.longitude){
                //console.log(this.scope.location.latitude,this.scope.location.longitude)
                //new google.maps.LatLng(this.scope.location.latitude, this.scope.location.longitude)
                this.map = new google.maps.Map(document.getElementById('map_canvas'), this.mapProp);
                this.map.setCenter({lat: this.scope.location.latitude, lng: this.scope.location.longitude});
                this.setMarker(this.scope.location.latitude,this.scope.location.longitude);
              }
        },
        data(){
            return{
              myCenter: null,
              mapProp: {
                        zoom: 13,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        scrollwheel: false,
                        draggable:false,
                        clickableIcons: false,
                        zoomControl: true
                        },
              map: null,
              geocoder:new google.maps.Geocoder()
            }
        },
        components:{

        },
        methods:{

          setMarker(lat,lng){

            let marker = new google.maps.Marker({
              position: new google.maps.LatLng(lat,lng),
              icon: "https://instagramstatic-a.akamaihd.net/h1/bundles/cdbe8f1edb2309a77710a746c05e5a3c.png"
            });
            marker.setMap(this.map);
          },

        },
        watch:{
        },
        events:{

            'update-address':function(newAddress) {
              let self = this;
              this.geocoder.geocode({'address': newAddress}, function (results, stats) {
                if(!self.scope.location) self.scope.location = {};

                if (stats == google.maps.GeocoderStatus.OK) {
                  let lat = results[0].geometry.location.lat();
                  self.scope.location.latitude = results[0].geometry.location.lat();
                  let lng = results[0].geometry.location.lng();
                  self.scope.location.longitude = results[0].geometry.location.lng();
                  self.scope.location.address = newAddress;

                  if(self.map == null) {
                    self.map = new google.maps.Map(document.getElementById('map_canvas'), self.mapProp);
                    self.map.setCenter({lat: lat, lng: lng});
                    self.setMarker(lat, lng);
                  } else {
                    self.map.setCenter({lat:lat,lng:lng});
                    self.setMarker(lat, lng);
                  }

                }
              })

            }
        },
        props: ['scope']

    }
</script>
