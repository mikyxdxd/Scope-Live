<template>
    <div class="card">
        <div class="author">
          <div class="userAvatar_name">
            <div class="userAvatar">
              <img id='avatar' :src='image.sourceOwner.profile_picture'>
            </div>
            <div class="userName_source">
              <div class='userName'>{{image.sourceOwner.username}}</div>
              <div class='source'>twitter</div>
            </div>
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
