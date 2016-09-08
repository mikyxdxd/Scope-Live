<template>
  <section>
    <intro></intro>
  </section>
  <section>
    <whatisit></whatisit>
  </section>
  <section>
    <floor></floor>
  </section>
  <section style="background: white">
    <contact></contact>
  </section>
</template>
<style>

</style>
<script>
  require('./landingpage.scss')

    export default{

      ready(){


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
        components:{
          intro: require('../intro/intro.vue'),
          whatisit:require('../whatisit/whatisit.vue'),
          contact: require('../contact/contact.vue'),
          floor:require('../floor/floor.vue')
        }
    }
</script>
