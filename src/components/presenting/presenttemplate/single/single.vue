<script>
  //  import Isotope from 'isotope-layout'
  require('./single.scss')
  export default{
    template:require('./single.html'),
    ready: function(){

      this.setCheckingInterval();
      this.currentImage = this.datalist[this.currentIndex++];

    },
    beforeDestroy:function(){

      if(this.checkingInterval){
        console.log('single clear')
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

    },

    data(){
      return{
        checkingInterval:null,
        currentImage:null,
        currentIndex:0
      }
    },
    props:['datalist','newimagelist','imagepresentinterval'],
    components:{
      card: require('../../../searchPage/card/card.vue')
    }
  }
</script>
