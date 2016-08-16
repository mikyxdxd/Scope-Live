<script>
  import dataService from '../../../services/dataservices'
  require('./latestpage.scss')
  export default{
    template:require('./latestpage.html'),
    ready: function(){
      console.log("picked");
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
        showadd:false,
        showLoading:true
      }
    },
    props:['scope', 'picked'],
    components:{
      'list': require('../../searchPage/photoList/list.vue'),
      'loadinganimation':require('../../loading/loading.vue')
    },
    methods: {
      updateDataList: function(data){
        if(data.length < this.pageSize) this.hasMore = false
        if(this.imageList.length == 0){
          this.imageList = data;
        }else{
          if(this.imageList.length < this.pageSize) this.hasMore = false
          this.imageList = this.imageList.concat(data);
        }
      },
      appendDataList: function(){
        this.showLoading = true;
        if(this.picked == "tag"){
          dataService.getImageViaTag(this.pageNo++, this.pageSize, this.timeStamp, this.scope.tag.replace(/#/g,' ')).then((res)=>{
            if(res.data.data.length ==  this.pageSize ) this.showLoading = false;
          this.updateDataList(res.data.data);
        });
        }else{
          console.log(this.picked);
        }

      }
    }
  }
</script>
