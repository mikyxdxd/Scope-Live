<script>
  //  import Isotope from 'isotope-layout'
  require('./single.scss')
  export default{
    template:require('./single.html'),
    ready: function(){

      this.setCheckingInterval();

    },
    beforeDestroy:function(){

      if(this.checkingInterval){
        clearInterval(this.checkingInterval);
      }

    },
    methods: {

      setCheckingInterval:function(){
        this.checkingInterval = setInterval(()=>{

          if(this.currentIndex == this.datalist.length - 1){
            this.currentIndex = 0;
          }

        let self = this;
        $( ".one_image" ).fadeTo( "fast" , 0, function(){});
        setTimeout(function(){
          self.currentImage = self.datalist[self.currentIndex++];
          self.$nextTick(function() {
            $(".one_image").fadeTo("fast", 1);
          })
          },1000)

        },10000)
      }

    },
    watch: {
      //once dataList updated, update the view
      'datalist': function(val, oldVal){

//          console.log(this.datalist[0])
          this.currentImage = this.datalist[this.currentIndex++];
//        let self = this;
//        setTimeout(function() {
//          window._iso = self._iso = new Isotope('#photo-list', {
//            layoutMode: 'masonry',
//            itemSelector: '.card',
//            transitionDuration: '0.5s'
//          });
//          imagesLoaded( $('#photo-list') ).on( 'progress', function(){
//            // layout Isotope after each image loads
//            $('.card').each((i,e)=>{
//              setTimeout(()=>{
//              $(e).addClass('loaded');
//            },i*50)
//          })
//            $('.card').removeClass('new');
//            self._iso.layout();
//          });
//
//        });

      }
    },
    data(){
      return{
        checkingInterval:null,
        currentImage:null,
        currentIndex:0
      }
    },
    props:['datalist','newimagelist'],
    components:{
      card: require('../../../searchPage/card/card.vue')
    }
  }
</script>
