<template>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of 7b15781... Merge remote-tracking branch 'origin/pr/1' into pr/1
    <div class="card one_image">
      <div class="user_info">
        <!--<div class="ui blue right ribbon label" ng-show="image.sourceType != 'PX' && image.sourceType != 'SM'"><i class="icon white" ng-class="determineOriginalIcon(image)"></i></div>-->
        <div class="ava"><a :href="determineOriginal(image)" target="__blacnk"><img alt="" :src='image.sourceOwner.profile_picture'></a></div>
        <div class="src">
          <div class="user_name"><a :href="determineOriginal(image)" target="__blacnk">{{image.sourceOwner.username}}</a></div>
          <div class="source">@{{determineOriginalText(image)}}</div>
          <div class="time_location" v-if="image.location">
            <div class="location ng-binding"><i class="icon tiny marker"></i>Brooklyn Bridge</div>
            <div class="image_time ng-binding" style="margin-left: 0.35em;"><i class=""></i>8 hours ago</div>
<<<<<<< HEAD
=======
    <div class="card new">
=======
    <div class="card">
>>>>>>> parent of 57489eb... -update
        <div class="author">
          <div class="userAvatar_name">
            <div class="userAvatar">
              <img id='avatar' :src='image.sourceOwner.profile_picture'>
            </div>
            <div class="userName_source">
              <div class='userName'>{{image.sourceOwner.username}}</div>
              <div class='source'>twitter</div>
            </div>
<<<<<<< HEAD
>>>>>>> origin/pr/1
=======
>>>>>>> parent of 57489eb... -update
=======
>>>>>>> parent of 7b15781... Merge remote-tracking branch 'origin/pr/1' into pr/1
          </div>
        </div>
        <div class="pic">
          <img :src='image.thumbnail.url'>
        </div>

      <div class="message">{{image.description}}</div>
    </div>
</template>

<script>
    require('./card.scss')
    export default{
        data(){
            return{

            }
        },
        components:{

        },
        props:['image'],
    }
</script>
