<script>
    require('./about.scss')
    export default{
        template:require('./about.html'),
        data(){
            return{

            }
        },
        components:{

        },
        methods:{
          dropDown(event){
            var target = $(event.currentTarget).closest('.right').next();
            var height = parseInt(target.css('height')) + 50;

            if(target.css('display') == 'none'){

              target.show().css('height','0px').stop(true,false).animate({height:height},500);

            }else {

              target.stop(true,false).animate({height: 0}, 500, function(){

                target.css('display','none')
                target.css('height','auto');
              })
            }
          }
        }
    }
</script>
