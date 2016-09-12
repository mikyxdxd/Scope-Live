<script>
  require('./floor.scss')
  export default{
    template:require('./floor.html'),
    ready(){
    },
    components:{

    },
    data(){
      return{
        brands:require('./resources/brand.jpg'),
        events:require('./resources/event.jpg'),
        presentations:require('./resources/presentation.jpg')
      }
    }
  }
</script>
