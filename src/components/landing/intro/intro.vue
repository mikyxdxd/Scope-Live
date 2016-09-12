<script>
  require('./intro.scss')
  export default{
    template:require('./intro.html'),
    ready(){
      var img = new Image();
      img.onload = ()=>{

        this.finished = true;

      }
      img.src = $('#intro_right').css('background-image').substr(5,$('#intro_right').css('background-image').length-7);

    },
    data(){
      return{
        finished:false
      }
    },
    components:{
      siteloader:require('../../siteloader/siteloader.vue'),
      search:require('../search/search.vue')
    },
    methods: {
    }
  }
</script>
