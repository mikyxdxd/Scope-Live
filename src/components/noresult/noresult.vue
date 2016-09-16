<script>
    require('./noresult.scss')
    export default{
        template:require('./noresult.html'),
        data(){
            return{
              nopic:require('../../assets/no_results.png')

            }
        },

      ready(){
      },
        components:{

        },
        props:['shownoreuslt','page']
    }
</script>
