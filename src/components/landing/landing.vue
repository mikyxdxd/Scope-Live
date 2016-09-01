<template>
  <div id="home">
    <navbar></navbar>

    <section>
      <intro></intro>
    </section>
    <section>
      <whatisit></whatisit>
    </section>
    <s_footer></s_footer>

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
      navbar: require('./header/header.vue'),
      intro: require('./intro/intro.vue'),
      whatisit:require('./whatisit/whatisit.vue'),
      s_footer:require('../footer/footer.vue')
    }
  }
</script>
