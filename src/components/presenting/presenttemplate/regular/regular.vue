<script>
  //  import Isotope from 'isotope-layout'
  require('./regular.scss')
  export default{
    template:require('./regular.html'),
    ready(){
      let self = this;
      setTimeout(function() {
        window._iso = self._iso = new Isotope('#photo-list', {
          layoutMode: 'masonry',
          itemSelector: '.card',
          transitionDuration: '0.5s'
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
      },2000);
      this.setCheckingInterval();
      },




    beforeDestroy:function(){

      if(this.checkingInterval){
        console.log('regular clear')
        clearInterval(this.checkingInterval);
      }

    },
    methods: {

      setCheckingInterval:function(){
        this.checkingInterval = setInterval(()=>{

          if(this.newimagelist.length){

          var img = this.newimagelist.pop();
          img.retina?this.datalist.unshift(img):'';

        }else{

          var img = this.datalist.pop();
          img.retina?this.datalist.unshift(img):'';

        }

//        this.$nextTick(()=> {
//          this._iso.layout()
//        });

      },10000)
      }

    },
    watch: {
      //once dataList updated, update the view
      'datalist': function(val, oldVal){
        let self = this;
        setTimeout(function() {
          window._iso = self._iso = new Isotope('#photo-list', {
            layoutMode: 'masonry',
            itemSelector: '.card',
            transitionDuration: '0.5s'
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
