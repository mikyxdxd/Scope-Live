<script>
  //  import Isotope from 'isotope-layout'
  require('./compact.scss')
  export default{
    template:require('./compact.html'),
    ready: function(){
      this.setCheckingInterval();
    },
    beforeDestroy:function(){

      if(this.checkingInterval){

        clearInterval(this.checkingInterval);
      }
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
    },
    methods:{
        setCheckingInterval:function(){
          this.checkingInterval = setInterval(()=> {

            console.log(this.datalist[0].id)

          if(this.newimagelist.length != 0){

            this.datalist.unshift(this.newimagelist.pop());

          }else{

            let select = false;
            let randInx = 0;
            while(!select){
              select = true;
              randInx = Math.floor((Math.random() *  this.datalist.length) + 0);
              for(let i = 0 ; i < 20 ; i ++){
                if( this.datalist[randInx].id == this.datalist[i].id ){

                  select = false;
                }
              }
            }

//            var replacing = Math.floor((Math.random() *  Math.min(20,this.datalist.length)) + 0);

            var replacing = 0;

            var img = this.datalist[randInx];


            this._iso.remove($('.one_image')[randInx])


            this.datalist.unshift(img);
            this.datalist.splice(randInx,1);
            this._iso.appended($('.new'));
//            imagesLoaded($('.new')[0]).on( 'progress', function(){
//
//
//              $('.card').removeClass('new');
//              window._iso.layout();
//
//            })
            this.$nextTick(()=>{

//              this.$nextTick(()=>{$('.new').removeClass('new');this._iso.layout();})

              setTimeout(function() {
                window._iso = self._iso = new Isotope('#photo-list', {
                  layoutMode: 'masonry',
                  initalLayout:'false',
                  itemSelector: '.one_image',
                  transitionDuration: '.5s'
                });
                imagesLoaded( $('#photo-list') ).on( 'progress', function(){
                  // layout Isotope after each image loads
                  $('.card').removeClass('new');
                  self._iso.layout();
                });

              });


            })
//
//            imagesLoaded( $('#photo-list') ).on( 'progress', function(){
////              console.log('called')
//              // layout Isotope after each image loads
////              $('.card').addClass('loaded');
//              $('.card').removeClass('new');
//              window._iso.layout();
//            });




//            this.$nextTick(()=>{window._iso.layout()})


//
//            console.log(this.datalist[0].id)




          }
        },2000)

        }
    }
  }
</script>
