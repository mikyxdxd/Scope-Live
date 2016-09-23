<script>
  require('./sidecontrol.scss')
  export default{
    template:require('./sidecontrol.html'),
    data(){
      return{
        lay: require('../../../assets/layout_icon.png'),
        int: require('../../../assets/interval_icon.png')
      }
    },
    ready(){
    },
    props:['layout','imagepresentinterval','showsetting']
  }
</script>
