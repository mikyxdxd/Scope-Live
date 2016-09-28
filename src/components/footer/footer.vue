<script>
    require('./footer.scss')
    export default{
        template:require('./footer.html'),
        data(){
            return{
              flogo: require('../../assets/scope_live_footer.png'),
              fb: require('../../assets/facebook.png'),
              ins: require('../../assets/instagram.png'),
              tw: require('../../assets/twitter.png')
            }
        },

      ready(){
      },
        components:{

        },
    }
</script>
