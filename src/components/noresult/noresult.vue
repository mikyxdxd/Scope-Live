<script>
    require('./noresult.scss')
    export default{
        template:require('./noresult.html'),
        data(){
            return{

            }
        },

      ready(){
        console.log(this.page)
      },
        components:{

        },
        props:['shownoreuslt','page']
    }
</script>
