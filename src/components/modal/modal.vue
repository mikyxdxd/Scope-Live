<template>
  <div class="modal-mask" v-show="show" transition="modal">
      <div class="modal-container">

        <div class="container-left">
          <div id="close_button" @click="show = false">
            <i class="fa fa-times" aria-hidden="true"></i>
          </div>

          <div id="user_info">
            <div id="user_avatar">
              <img :src='image.sourceOwner.profile_picture'>
            </div>
            <div id="user_info_right">
              <div id="user_name">
                <a :href="determineOriginal(image)" target="__blacnk">{{image.sourceOwner.username}}</a>
              </div>

              <div class="time_location" v-if="image.location">
                <div class="location ng-binding"><i class="icon tiny marker"></i>Brooklyn Bridge</div>
                <div class="image_time ng-binding" style="margin-left: 0.35em;"><i class=""></i>8 hours ago</div>
              </div>

            </div>
          </div>

          <div class="ui divider"></div>

          <div id="image_info">
            <div id="image_description">
              {{image.description}}
            </div>
            <div id="image_tags">
              <ul class="tag_list">
                <li class="one_tag" v-for="tag in image.tags"><a>{{'#' + tag.text}}</a></li>
              </ul>
            </div>
          </div>

        </div>

        <div class="container-right">
          <div class="image">
            <img :src="image.retina.url">
          </div>
        </div>
  </div>
</template>

<script>
  require('./modal.scss')
    export default{
      props: {
        show: {
          type: Boolean,
          required: true,
          twoWay: true
        },
        image:{
          type: Object
        }
      },
        data(){
            return{

            }
        },
        components:{
        },

        methods:{

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

        }
    }
</script>
