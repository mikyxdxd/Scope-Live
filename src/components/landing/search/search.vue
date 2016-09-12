<script>
  require('./search.scss')
  export default{
    template:require('./search.html'),
    ready(){
    },
    components:{

    },
    methods:{
      searchTag: function (tag) {
        console.log("ladnSearch");
        this.$route.router.go({name: 'landSearch', params: {tag: tag.trim()}});
        tag = '';
      }
    },
    data(){
      return{
      }
    }
  }
</script>
