<script>
  import dataService from '../../../services/dataservices'
  require('./latestpage.scss')
  export default{
    template:require('./latestpage.html'),
    ready: function(){
      this.timeStamp = Date.now();
      this.scopeId = this.$route.params.scopeId;
      this.appendDataList();
      this.user= dataService.getUser();

//      dataService.getImageViaScope(this.pageNo++, this.pageSize, this.timeStamp, this.scopeId).then((res)=>{
//        this.updateDataList(res.data.data);
//      });

    },
    data(){
      return{
        imageList: [],
        pageSize: 20,
        pageNo: 0,
        hasMore:true,
        user:{},
        showdelete:false
      }
    },
    props:['scope'],
    components:{
      'list': require('../../searchPage/photoList/list.vue'),
    },
    methods: {
      updateDataList: function(data){
        if(this.imageList.length == 0){
          this.imageList = data;
        }else{
          if(this.imageList.length < this.pageSize) this.hasMore = false
          this.imageList = this.imageList.concat(data);
        }
      },
      appendDataList: function(){
        dataService.getImageViaScope(this.pageNo++, this.pageSize, this.timeStamp, this.scopeId).then((res)=>{
          this.updateDataList(res.data.data);
        });
      }
    }
  }
</script>
