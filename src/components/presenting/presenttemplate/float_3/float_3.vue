<script>
  //  import Isotope from 'isotope-layout'
  require('./float_3.scss')
  export default{
    template:require('./float_3.html'),
    ready(){
      let self = this;
      setTimeout(function() {
        if(!self.image_left && !self.image_center && !self.image_right){
          self.image_left =  JSON.parse(JSON.stringify( self.datalist[0]))
          self.image_center = JSON.parse(JSON.stringify( self.datalist[1]));
          self.image_right = JSON.parse(JSON.stringify( self.datalist[2]))}

      });
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

            let img;
        if(this.newimagelist.length){
          img = this.newimagelist.pop();
          img.retina?this.datalist.unshift(img):'';
          //currentReplacing = 0;

        }else{

          img = this.datalist.pop();
          img.retina?this.datalist.unshift(img):'';

        }

        let self = this;
        switch(this.replacingIndex++){
          case 0:
            $($( ".one_image" )[0]).fadeTo( "fast" , 0, function(){

            });
            setTimeout(()=>{
              self.image_left = JSON.parse(JSON.stringify(img));
        },1000)
        setTimeout(()=>{
          $($( ".one_image" )[0]).fadeTo( "slow" , 1, function(){});
      },2000)
        break;

        case 1:
        $($( ".one_image" )[1]).fadeTo( "fast" , 0, function(){
        });
        setTimeout(()=>{
          self.image_center = JSON.parse(JSON.stringify(img));
      },1000)
        setTimeout(()=>{
          $($( ".one_image" )[1]).fadeTo( "slow" , 1, function(){});
      },2000)
        break;

        case 2:
        $($( ".one_image" )[2]).fadeTo( "fast" , 0, function(){
        });
        setTimeout(()=>{
          self.image_right = JSON.parse(JSON.stringify(img));
      },1000)
        setTimeout(()=>{
          $($( ".one_image" )[2]).fadeTo( "slow" , 1, function(){});
      },2000)
        this.replacingIndex = 0;
        break;
      }

      },10000)
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
