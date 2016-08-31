<template>
  <div id="home">
  <!--<div id="intro-container">-->

        <!--<div id="center">-->
        <!--<div class="caption">The social search & display platform</div>-->
        <!--<form v-on:submit.prevent="searchTag(tag)" >-->
          <!--<div class="search-wrapper">-->
          <!--<input type="search" placeholder="Start your search here" v-model="tag"><i class="material-icons">search</i>-->
          <!--</div>-->
        <!--</form>-->
        <!--</div>-->
  <!--</div>-->
  <!--<div id="customer">-->
    <!--Our customer-->
  <!--</div>-->

  <section>
    <intro></intro>
  </section>
  <section>
    <whatisit></whatisit>
  </section>
  <section></section>
  <section></section>

    </div>
</template>
<script>
  require('./landing.scss')


  export default{
    ready: function(){
      this.timeStamp = Date.now();
    },

    methods: {
      searchTag: function(tag){
        this.$route.router.go({ name: 'search', params: { tag: tag.trim()}});
      },
      scrollChange(){

        if($('body').scrollTop() <= $('#intro').height()/3){
          $('#header').addClass('home')
        }else{
          $('#header').removeClass('home')
        }
      }
    },
    props:['timeStamp'],
    data(){
      return{
        pageSize: 30,
        tag: ""
      }
    },
    ready(){
      if(this.$route.path == '/'){
        $('#header').addClass('home')
        window.addEventListener("scroll", this.scrollChange);
      };
    },
    components:{
      navbar: require('../header/header.vue'),
      intro: require('./intro/intro.vue'),
      whatisit:require('./whatisit/whatisit.vue')
    }
  }
</script>
