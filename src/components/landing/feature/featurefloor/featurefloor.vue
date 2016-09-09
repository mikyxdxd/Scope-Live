<script>
  require('./featurefloor.scss')
  export default{
    template:require('./featurefloor.html'),
    ready(){
    },
    components:{

    },
    data(){
      return{
        pContent: require('../../../../assets/Prescreened-Content.png'),
        pOptions: require('../../../../assets/Presentation-Options.png'),
        pScope:   require('../../../../assets/Create-Scopes.png'),
        pLocation:require('../../../../assets/Location_Search-.png'),
        pAlbum:   require('../../../../assets/Album-Customization.png')
      }
    },
  }
</script>
