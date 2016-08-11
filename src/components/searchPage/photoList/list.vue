<template>
    <div id="photo-list">
          <div v-for="image in datalist" class='singleItem'>
            <card :image="image"  :showdelete.sync="showdelete" :showadd.sync="showadd" ></card>
          </div>
    </div>
</template>

<script>
//  import Isotope from 'isotope-layout'
    export default{
        ready: function(){
        },
        watch: {
          //once dataList updated, update the view
          'datalist': function(val, oldVal){
              var self = this;
              if(oldVal.length == 0){
                setTimeout(function() {
                  window._iso = self._iso = new Isotope('#photo-list', {
                    layoutMode: 'masonry',
                    itemSelector: '.card',
                    transitionDuration: 0
                  });
                  imagesLoaded( $('#photo-list') ).on( 'progress', function(){
                    // layout Isotope after each image loads
                    $('.card').each((i,e)=>{
                      setTimeout(()=>{
                        $(e).addClass('loaded');
                      },i*50)
                    })
                    $('.card').removeClass('new');
                    self._iso.layout();
                  });

                });
              }else{
                self.$nextTick(function() {
                  setTimeout(function() {
                    self._iso.appended($('.new'));
                    imagesLoaded( $('#photo-list') ).on( 'progress', function(){
                      // layout Isotope after each image loads
                      $('.new').each((i,e)=>{
                        setTimeout(()=>{
                        $(e).addClass('loaded');
                      },i*50)
                      })
                      $('.card').removeClass('new');
                      self._iso.layout();
                    });
                  });
                });
              }
            }
        },
        data(){
            return{
            }
        },
        props:['datalist','showdelete','showadd'],
        components:{
          card: require('../card/card.vue')
        },
        methods:{

        }
    }
</script>
