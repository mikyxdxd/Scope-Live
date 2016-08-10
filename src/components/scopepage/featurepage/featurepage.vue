<template>
  <div id="featurepage">
    <list :datalist.sync="imageList"></list>
    <div id="loadMore" v-show="imageList.length>0 && hasMore"><button class="waves-effect waves-light btn" v-on:click="appendDataList()">Load More</button></div>
  </div>
</template>

<script>
  import dataService from '../../../services/dataservices'
  require('./featurepage.scss')
  export default{
    ready: function(){
//      this.timeStamp = Date.now();
//      this.tag = this.$route.params.tag;
//      dataService.getImageViaTag(this.pageNo, this.pageSize, this.timeStamp, this.tag).then((res)=>{
//        this.pageNo++;
//      this.updateDataList(res.data.data);
//    });

    },
    data(){
      return{
        imageList: [],
        pageSize: 20,
        pageNo: 0,
        hasMore:true
      }
    },
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
        dataService.getImageViaTag(this.pageNo, this.pageSize, this.timeStamp, this.tag).then((res)=>{
          this.pageNo++;
          this.updateDataList(res.data.data);
      });
      }
    }
  }
</script>
