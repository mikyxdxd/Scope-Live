<script>
  require('./presentheader.scss')
  export default{
    template:require('./presentheader.html'),
    props:['scope','showsetting','op'],
    ready(){
//      setTimeout(()=> {
//        console.log(this.scope)
//      )},2000)
    },
    data(){
      return {
        plogo: require('../../../assets/Scope_live_footer.png'),
      }
    }
  }
</script>

