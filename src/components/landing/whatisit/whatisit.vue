<script>
  require('./whatisit.scss')
  export default{
    template:require('./whatisit.html'),
    ready(){
      console.log(this.image)
    },
    data(){
      return{
        image:require('../resources/whatisit.jpg')
      }
    },
    components:{

    }
  }
</script>
