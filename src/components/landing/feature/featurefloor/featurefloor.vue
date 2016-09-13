<script>
  require('./featurefloor.scss')
  export default{
    template:require('./featurefloor.html'),
    ready(){
    },
    data(){
      return{
        'Album_Customization':require('./resources/Album-Customization.png'),
        'Create_Scopes':require('./resources/Create-Scopes.png'),
        'Location_Search':require('./resources/Location-Search.png'),
        'Prescreened_Content':require('./resources/Prescreened-Content.png'),
        'Presentation_Options':require('./resources/Presentation-Options.png'),
        'Embed_Services': require('./resources/Embed-Services-.png')
      }
    },
    components:{

    },
  }
</script>
