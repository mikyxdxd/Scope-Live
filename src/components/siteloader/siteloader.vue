<template>
  <div id="siteloader">
    <div id="acon"></div>
  </div>
</template>
<script>
    require('./siteloader.scss')
    export default{
        ready(){

          $('html').css('overflow-y','hidden');
          this.bar = new ProgressBar.Circle(acon, {
            color: '#ecb17c',
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 2,
            trailWidth: 1,
            easing: 'easeInOut',
            duration: 2500,
            text: {
              autoStyleContainer: false
            },
            from: { color: '#480f84', width: 2 },
            to: { color: '#480f84', width: 2 },
            // Set default step function for all animate calls
            step: function(state, circle) {
              circle.path.setAttribute('stroke', state.color);
              circle.path.setAttribute('stroke-width', state.width);

              var value = Math.round(circle.value() * 100);
              if (value === 0) {
                circle.setText('');
              } else {
                circle.setText(value);
              }

            }
          });

          this.bar.animate(0.9);  // Number from 0.0 to 1.0


        },
      watch:{
        'finished': {
          handler: function (finished, oldVal) { if(finished){
            
            this.bar.animate(1,()=>{

              $('#siteloader').fadeOut();
              $('html').css('overflow-y','auto');

            });

          } },
          deep: true
        }
      },
      data(){

          return{

            bar:null

          }

      },
        components:{

        },
        props:['finished']
    }
</script>
