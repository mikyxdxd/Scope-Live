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
        brand: require("../../../assets/for_brand_image.jpg"),
        present: require("../../../assets/For-Presentations_image.jpg"),
        event: require("../../../assets/For_Events_image.jpg"),
        iconb: require("../../../assets/for_brand.png"),
        icone: require("../../../assets/For_events.png"),
        iconp: require("../../../assets/For_presentations.png")
      }
    },
  }
</script>
