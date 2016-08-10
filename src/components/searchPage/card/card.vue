<template>
    <div class="card one_image new" @click="showModal = true">
      <div class="user_info">
        <!--<div class="ui blue right ribbon label" ng-show="image.sourceType != 'PX' && image.sourceType != 'SM'"><i class="icon white" ng-class="determineOriginalIcon(image)"></i></div>-->
        <div class="ava"><a :href="determineOriginal(image)" target="__blacnk"><img alt="" :src='image.sourceOwner.profile_picture'></a></div>
        <div class="src">
          <div class="user_name"><a :href="determineOriginal(image)" target="__blacnk">{{image.sourceOwner.username}}</a></div>
          <div class="source">@{{determineOriginalText(image)}}</div>
          <div class="time_location" v-if="image.location">
            <div class="location ng-binding"><i class="icon tiny marker"></i>Brooklyn Bridge</div>
            <div class="image_time ng-binding" style="margin-left: 0.35em;"><i class=""></i>8 hours ago</div>
          </div>
        </div>
      </div>
       <div class="pic">
          <img :src='image.thumbnail.url'>
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
  <modal :image="image" :show.sync="showModal"></modal>
</template>

<script>
    require('./card.scss')
    export default{
        data(){
            return{
              showModal: false
            }
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
          modal: require('./modal/modal.vue')
        },
        props:['image'],
    }
</script>
