<script>
    require('./appheader.scss')
    export default{
        template:require('./appheader.html'),
        data(){
            return{
              logo: require('../../../assets/scope_live_logo.png'),
              showAddScope:false,
              tag: '',
              defaultTag:this.$route.params.tag ? this.$route.params.tag.split(' ') : null
            }
        },

      ready(){
      },
      watch:{
        '$route.params.tag':function(nv, ov){
          if(nv){
            //console.log(nv);
            this.defaultTag = this.$route.params.tag.split(' ');
          }
        }
      },
      components:{
        addscope: require("../../addScope/addScope.vue")
      },
      methods: {
        searchTag: function (tag) {
          console.log("Search");
          this.$route.router.go({name: 'search', params: {tag: tag.trim()}});
        }
      }
    }
</script>
