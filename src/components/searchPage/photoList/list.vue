<template>
    <div id="photo-list">
          <div v-for="image in datalist" class='singleItem'>
            <card :image="image"></card>
          </div>
    </div>
</template>

<script>
  import Isotope from 'isotope-layout'
  require('./photolist.scss')
    export default{
        ready: function(){
        },
        watch: {

          'datalist': function(val, oldVal){
              var self = this;
              if(oldVal.length == 0){
                setTimeout(function() {
                  self._iso = new Isotope('#photo-list', {
                    layoutMode: 'masonry',
                    itemSelector: '.card',
                    transitionDuration: 0
                  });
                  $('.card').addClass('loaded');
                }, 1000);
              }else{
                console.log(val.length);
              }
              console.log('new: %s, old: %s', val, oldVal);
            }
        },
        data(){
            return{
            }
        },
        props:['datalist'],
        components:{
          card: require('../card/card.vue')
        },
        methods:{

        }
    }
</script>
