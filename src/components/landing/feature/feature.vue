<script>
  require('./feature.scss')
  export default{
    template:require('./feature.html'),
    ready(){
    },
    components:{
      featurefloor:require('./featurefloor/featurefloor.vue')
    }
  }
</script>
