<template>
  <section>
  <intro></intro>
  </section>
  <section>
  <whatisit></whatisit>
  </section>
</template>
<style>

</style>
<script>
  require('./landingpage.scss')

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
        }
      },
      ready(){
        if(this.$route.path == '/'){
          $('#header').addClass('home')
          window.addEventListener("scroll", this.scrollChange);
        };
      },
        components:{
          intro: require('../intro/intro.vue'),
          whatisit:require('../whatisit/whatisit.vue'),
        }
    }
</script>
