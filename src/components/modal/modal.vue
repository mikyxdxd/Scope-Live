<template>
  <div class="modal-mask" v-show="show" transition="modal" @click="show = false">
      <div class="modal-container">
        <article>

          <!--<div class="user_info_ctn">-->

          <div id="user_info" v-if="image.sourceOwner">
            <div id="wrapper">
            <div id="user_avatar">
              <img :src='image.sourceOwner.profile_picture'>
            </div>
            <div id="user_info_right">
              <div id="user_name">
                <a :href="determineOriginal(image)" target="__blacnk">{{image.sourceOwner.username}}</a>
              </div>

              <div class="time_location">
                <div class="location" v-if="image.location"><i class="fa fa-map-marker" aria-hidden="true" style="margin-right:0.5em"></i>{{image.location.address}}</div>
                <div class="image_time"><i class="fa fa-clock-o" aria-hidden="true" style="margin-right:0.2em"></i>{{getShotTime(image.shotTime)}}</div>
              </div>

            </div>
              </div>
          </div>

            <!--</div>-->



          <div id="image_info_left">
            <div id="image_description">
              {{image.description}}
            </div>
            <div id="image_tags">
              <ul class="tag_list">
                <li class="one_tag" v-for="tag in image.tags"><a>{{'#' + tag.text}}</a></li>
              </ul>
            </div>
          </div>

          <div>
            <div id="rtn-image" v-bind:style="{paddingBottom: heightPerc}">
              <img :src="image.retina.url">
            </div>
            <div id="temp"></div>
          </div>

        </article>



          <!--<div class="container-left">-->
            <!--<div id="close_button" @click="show = false">-->
              <!--<i class="fa fa-times" aria-hidden="true"></i>-->
            <!--</div>-->



            <!--<div class="ui divider"></div>-->



          <!--</div>-->

          <!--<div class="container-right">-->
            <!--<div class="image">-->
              <!--<img :src="image.retina.url">-->
            <!--</div>-->
          <!--</div>-->
        <!--</article>-->
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
        },
        width:{
          required: true
        },
        height:{
          required: true
        }
      },

      ready(){

//
      },
        data(){
            return{
              heightPerc: 0
            }
        },
        components:{
        },

        watch: {
          'width': function(val, oldVal){
            let width = val;
            let height = this.height;
            let perc = 600* this.height / this.width / 600 * 100;
            perc = perc.toString() + "%";
            this.heightPerc = perc;
          },
          'show':function(val, oldVal){
            if (val){
              $('html').css('overflow-y','hidden');
            }else{
              $('html').css('overflow-y','auto');
            }
          }
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
          }
        }
    }
</script>
