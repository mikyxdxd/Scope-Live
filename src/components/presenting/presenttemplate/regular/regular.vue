<script>
  //  import Isotope from 'isotope-layout'
  require('./regular.scss')
  export default{
    template:require('./regular.html'),
    ready: function(){

      this.setCheckingInterval();

    },
    methods: {

      setCheckingInterval:function(){
        this.checkingInterval = setInterval(()=> {
            console.log('regular',this.newimagelist);
            if(this.newimagelist.length != 0){
              this.datalist.unshift(this.newimagelist.pop());
            }

        },5000)
      }

    },
    watch: {
      //once dataList updated, update the view
      'datalist': function(val, oldVal){

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


//        var self = this;
//        if(oldVal.length == 0){
//          setTimeout(function() {
//            window._iso = self._iso = new Isotope('#photo-list', {
//              layoutMode: 'masonry',
//              itemSelector: '.card',
//              transitionDuration: 0
//            });
//            imagesLoaded( $('#photo-list') ).on( 'progress', function(){
//              // layout Isotope after each image loads
//              $('.card').each((i,e)=>{
//                setTimeout(()=>{
//                $(e).addClass('loaded');
//              },i*50)
//            })
//              $('.card').removeClass('new');
//              self._iso.layout();
//            });
//
//          });
//        }else{
//          self.$nextTick(function() {
//            setTimeout(function() {
//              self._iso.appended($('.new'));
//              imagesLoaded( $('#photo-list') ).on( 'progress', function(){
//                // layout Isotope after each image loads
//                $('.new').each((i,e)=>{
//                  setTimeout(()=>{
//                  $(e).addClass('loaded');
//                },i*50)
//              })
//                $('.card').removeClass('new');
//                self._iso.layout();
//              });
//            });
//          });
//        }
      }
    },
    data(){
      return{
        checkingInterval:null
      }
    },
    props:['datalist','newimagelist'],
    components:{
      card: require('../../../searchPage/card/card.vue')
    }
  }
</script>
