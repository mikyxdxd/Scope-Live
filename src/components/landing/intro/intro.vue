<script>
  require('./intro.scss')
  export default{
    template:require('./intro.html'),
    data(){
      return{

      }
    },
    components:{

    },
    methods: {
      searchTag: function (tag) {
        this.$route.router.go({name: 'search', params: {tag: tag.trim()}});
      }
    }
  }
</script>
