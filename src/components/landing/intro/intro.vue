<script>
  require('./intro.scss')
  export default{
    template:require('./intro.html'),
    data(){
      return{
        tag: ''
      }
    },
    components:{

    },
    methods: {
      searchTag: function (tag) {
        console.log("ladnSearch");
        this.$route.router.go({name: 'landSearch', params: {tag: tag.trim()}});
        tag = '';
      }
    }
  }
</script>
