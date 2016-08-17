<script>
  //  import Isotope from 'isotope-layout'
  require('./float_3.scss')
  export default{
    template:require('./float_3.html'),
    ready(){

//      console.log('here',this.datalist[0])
//        this.image_left = this.datalist[0];
//        this.image_center = this.datalist[1];
//        this.image_right = this.datalist[2];
//      let self = this;
//      setTimeout(function() {
//        window._iso = self._iso = new Isotope('#photo-list', {
//          layoutMode: 'masonry',
//          itemSelector: '.card',
//          transitionDuration: '0.5s'
//        });
//        imagesLoaded( $('#photo-list') ).on( 'progress', function(){
//          // layout Isotope after each image loads
//          $('.card').each((i,e)=>{
//            setTimeout(()=>{
//            $(e).addClass('loaded');
//          },i*50)
//        })
//          $('.card').removeClass('new');
//          self._iso.layout();
//        });
//      },2000);
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
        this.checkingInterval = setTimeout(()=>{


          let img;
          if(this.newimagelist.length){
          img = this.newimagelist.pop();
          img.retina?this.datalist.unshift(img):'';
          //currentReplacing = 0;

        }else{

          img = this.datalist.pop();
          img.retina?this.datalist.unshift(img):'';

        }

//        console.log(this.replacingIndex)
//        switch(this.replacingIndex){
//          case 0:
//            self.image_left = JSON.parse(JSON.stringify(img));
//            self.replacingIndex ++;
//            console.log('in 1')
//            break;
//          case 1:
//            self.image_center = JSON.parse(JSON.stringify(img));
//            self.replacingIndex ++;
//            console.log('in 2')
//            break;
//          case 2:
//            self.image_right = JSON.parse(JSON.stringify(img));
//            self.replacingIndex = 0;
//            break;
//        }

        console.log('called')

//        this.$nextTick(()=> {
//          this._iso.layout()
//        });

//      },this.imagepresentinterval * 1000)
      },5000)
      }

    },
    watch: {

      'imagepresentinterval':function(val,oldVal){

        if(this.checkingInterval){
          clearInterval(this.checkingInterval);
        }
        this.setCheckingInterval();

      },

      'datalist': function(val, oldVal){
        let self = this;
        setTimeout(function() {

          self.image_left =  JSON.parse(JSON.stringify( self.datalist[0]))
          self.image_center = JSON.parse(JSON.stringify( self.datalist[1]));
          self.image_right = JSON.parse(JSON.stringify( self.datalist[2]))


//          self.datalist[1] = null;

//          self.setCheckingInterval();


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

        });

      }
    },
    data(){
      return{
        checkingInterval:null,
        replacingIndex:0,
        currentReplacing:0,
        image_left:null,
        image_center:null,
        image_right:null
      }
    },
    props:['datalist','newimagelist','imagepresentinterval'],
    components:{
      card: require('../../../searchPage/card/card.vue')
    }
  }
</script>
