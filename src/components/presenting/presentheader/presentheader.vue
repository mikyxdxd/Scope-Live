<script>
  require('./presentheader.scss')
  export default{
    template:require('./presentheader.html'),
    props:['scope'],
    ready(){
//      setTimeout(()=> {
//        console.log(this.scope)
//      )},2000)
    }
  }
</script>
