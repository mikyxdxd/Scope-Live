<template>
    <div id="searchpage">
    <searchheader></searchheader>
    <list :datalist.sync="dataList"></list>
    <div id="loadMore" v-show="dataList.length>0 && hasMore"><button class="waves-effect waves-light btn" v-on:click="appendDataList()">Load More</button></div>
      </div>
</template>

<script>
  import dataService from '../../services/dataservices'
  require('./search.scss')
    export default{
        ready: function(){
          this.timeStamp = Date.now();
          this.tag = this.$route.params.tag;
          dataService.getImageViaTag(this.pageNo, this.pageSize, this.timeStamp, this.tag).then((res)=>{
            this.pageNo++;
            this.updateDataList(res.data.data);
          });

        },
        data(){
            return{
              dataList: [],
              pageSize: 20,
              pageNo: 0,
              hasMore:true

            }
        },
        params:['tag','dataList'],
        components:{
            'list': require('./photoList/list'),
            'searchheader':require('./searchheader/searchheader.vue')

        },

        methods: {
          updateDataList: function(data){
            if(this.dataList.length == 0){
              this.dataList = data;
            }else{
              if(this.dataList.length < this.pageSize) this.hasMore = false
              this.dataList = this.dataList.concat(data);
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
