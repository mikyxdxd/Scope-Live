<template>

  <div id="intro-container">

        <form v-on:submit.prevent="searchTag(tag)" >
          <div class="search-wrapper">
          <input type="search" placeholder="Start your search here" v-model="tag"><i class="material-icons">search</i>
          </div>
        </form>

  </div>

  <div id="customer">
    Our customer
  </div>

  <section>
    <product></product>
  </section>
  <section></section>
  <section></section>
  <section></section>
</template>



<script>
  require('./landing.scss')


  export default{
    ready: function(){
      this.timeStamp = Date.now();
    },

    methods: {
      searchTag: function(tag){
        this.$route.router.go({ name: 'search', params: { tag: tag}});
      }
    },
    props:['timeStamp'],
    data(){
      return{
        pageSize: 30
      }
    },
    components:{
      navbar: require('../header/header.vue'),
      product: require('./product/product.vue')
    }
  }
</script>
