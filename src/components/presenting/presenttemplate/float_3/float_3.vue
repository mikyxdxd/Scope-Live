<script>
  //  import Isotope from 'isotope-layout'
  require('./float_3.scss')
  export default{
    template:require('./float_3.html'),
    ready(){

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



        console.log('called')

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
