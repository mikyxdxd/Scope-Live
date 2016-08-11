<template>
    <div class="card one_image new">
      <div class="imgCtr" v-if="showdelete">
        <div class="trash ctr" v-if="showdelete"><i class="fa fa-trash" aria-hidden="true"></i></div>
      </div>
      <div class="user_info">
        <!--<div class="ui blue right ribbon label" ng-show="image.sourceType != 'PX' && image.sourceType != 'SM'"><i class="icon white" ng-class="determineOriginalIcon(image)"></i></div>-->
        <div class="ava"><a :href="determineOriginal(image)" target="__blacnk"><img v-if="image.sourceOwner" alt="" :src='image.sourceOwner.profile_picture'><img v-else alt="" :src='image.owner.avatar'></a></div>
        <div class="src">
          <div class="user_name">
            <a v-if="image.sourceOwner" :href="determineOriginal(image)" target="__blacnk">{{image.sourceOwner.username}}</a>
            <a v-else :href="determineOriginal(image)" target="__blacnk">{{image.owner.name}}</a>
          </div>
          <div v-if="image.sourceOwner" class="source">@{{determineOriginalText(image)}}</div>
          <div v-else class="source">@Scope</div>
          <div class="time_location">
            <div class="location ng-binding" v-if="image.location"><i class="fa fa-map-marker" aria-hidden="true" style="margin-right:0.5em"></i>{{image.location.address}}</div>
            <div class="image_time ng-binding"><i class="fa fa-clock-o" aria-hidden="true" style="margin-right:0.2em"></i>{{getShotTime(image.shotTime)}}</div>
          </div>
        </div>
      </div>
       <div class="pic" @click="showModal = true">
         <div>{{loadImage}}</div>
          <img :src='image.retina.url' {{ loadImage }} id="retina_img">
        </div>
      <div class="image_info">
        <div class="caption">{{image.caption}}</div>
        <div class="des">{{image.description}}</div>
        <div>
          <ul class="tag_list">
            <li class="one_tag" v-for="tag in image.tags"><a>{{'#' + tag.text}}</a></li>
          </ul>
        </div>
      </div>
    </div>
  <modal :image="image" :width={{width}}  :height={{height}} :show.sync="showModal"></modal>
</template>

<script>
    require('./card.scss')
    export default{
        data(){
            return{
              showModal: false,
              width: 0,
              height: 0,
            }
        },


        computed: {
          loadImage: function(){
            $('#retina_img').load(function(){

            }).attr
          }
        },

      ready(){


      },


        methods:{
          determineOriginalText: function (image) {
            if (image) {
              switch (image.sourceType) {
                case'SM':
                  return 'scope';
                case 'IN':
                  return 'instagram';
                case 'WB':
                  return 'weibo';
                case 'TU':
                  return 'Tumbler'
                case 'TW':
                  return 'twitter';
                case 'FL':
                  return 'flickr';
                case 'FS':
                  return 'foursquare';
                case 'PX':
                  return '500px';
                case 'PN':
                  return 'panoramio';
              }
            }
          },
          getShotTime: function (shotTime) {
            var second = (Date.now() - shotTime) * 0.001;
            var minutes = second / 60;
            var hour = minutes / 60;
            if (hour < 1) {
              return Math.floor(minutes) + ' mins ago';
            }
            var day = hour / 24;
            if (day < 1) {
              return Math.floor(hour) + ' hours ago';
            }
            var week = day / 7;
            if (week < 1) {
              return Math.floor(day) + ' days ago';
            }
            return Math.floor(week) + ' weeks ago';
          },

          determineOriginal: function (image) {

            if (image && image.sourceOwner) {
              switch (image.sourceType) {
                case'SM':
                  return '#/user/' + image.owner.id;
                  break;
                case 'IN':
                  if (image.sourceOwner != null)
                    return 'https://instagram.com/' + image.sourceOwner.username;
                  break;
                case 'WB':
                  return 'https://weibo.com/' + image.sourceOwner.id;
                  break;
                case 'TW':
                  return 'https://twitter.com/' + image.sourceOwner.username;
                  break;
                case 'FL':
                  return 'https://www.flickr.com/photos/' + image.sourceOwner.id;
                  break;
                case 'PX':
                  return 'https://500px.com/' + image.sourceOwner.username.replace(/ /g, '');
                  break;
                case 'TU':
                  return 'https://' + image.sourceOwner.id;
                  break;
              }
            }
          }


        },
        components:{
          modal: require('../../modal/modal.vue')
        },
        props:['image','showdelete'],
    }
</script>
