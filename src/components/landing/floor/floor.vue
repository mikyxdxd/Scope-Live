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
        presentations:require('./resources/presentation.jpg'),
        iconb: require("../../../assets/for_brand.png"),
        icone: require("../../../assets/For_events.png"),
        iconp: require("../../../assets/For_presentations.png")
      }
    }
  }
</script>
