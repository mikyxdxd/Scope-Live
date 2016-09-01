<template>
  <div id="home">

    <div id="landingcontent_view">
      <navbar></navbar>
      <router-view id="routerview"></router-view>
      <s_footer></s_footer>
    </div>
  </div>
</template>
<script>
  require('./landing.scss')


  export default{
    ready: function(){
    },

    methods: {
    },
    data(){
      return{
      }
    },
    ready(){
    },
    components:{
      navbar: require('./header/header.vue'),
      s_footer:require('../footer/footer.vue')
    }
  }
</script>
