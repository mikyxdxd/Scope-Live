<script>
  //  import Isotope from 'isotope-layout'
  require('./compact.scss')
  export default{
    template:require('./compact.html'),
    beforeDestroy:function(){
      if(this.checkingInterval){
        console.log('compact clear')
        clearInterval(this.checkingInterval);
      }
    },
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
    data(){
      return{
        checkingInterval:null
      }
    },
    props:['datalist','newimagelist','imagepresentinterval'],
    components:{
      card: require('../../../searchPage/card/card.vue')
    },
    methods:{
        setCheckingInterval:function(){
          this.checkingInterval = setInterval(()=>{

            if(this.newimagelist.length){

            var img = this.newimagelist.pop();
            img.retina?this.datalist.unshift(img):'';

            }else{

            var img = this.datalist.pop();
            img.retina?this.datalist.unshift(img):'';

            }

          this.$nextTick(()=> {
            window._iso.layout()
           });

        },this.imagepresentinterval * 1000)

        }
    },
    watch:{

      'imagepresentinterval':function(val,oldVal){

        if(this.checkingInterval){
          clearInterval(this.checkingInterval);
        }
        this.setCheckingInterval();

      }

    }
  }
</script>
